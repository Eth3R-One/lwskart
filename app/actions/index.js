"use server";

import { signIn } from "@/auth";
import { getCartItems, getProductById } from "@/database/queries";
import cartsModel from "@/models/cart-model";
import { productModel } from "@/models/product-model";
import { userAddressModel } from "@/models/user-address-model";
import { userModel } from "@/models/user-model";
import { wishlistModel } from "@/models/wishlist-model";
import { dbConnect } from "@/service/mongo";
import { replaceMongoIdInObject } from "@/utils/data-utils";
import { revalidatePath } from "next/cache";

export async function login(formData) {
  dbConnect();
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (err) {
    throw err;
  }
}

export const toggleWishList = async (userId, productId) => {
  await dbConnect();

  try {
    const wishlist = await wishlistModel.findOne({ userId });
    if (!wishlist) {
      const created = await wishlistModel.create({
        userId,
        products: [productId],
      });
      await created.save();
    } else {
      const productIndex = wishlist.products.indexOf(productId);
      if (productIndex === -1) {
        wishlist.products.push(productId);
      } else {
        wishlist.products.splice(productIndex, 1);
      }
      await wishlist.save();
    }
    revalidatePath("/", "layout");
    return { status: 201 };
  } catch (err) {
    return { status: 500, error: err.message };
  }
};

export const updateCart = async (userId, productId, quantity) => {
  await dbConnect();

  try {
    const cart = await cartsModel.findOne({ userId });

    const product = await productModel.findOne({ _id: productId }).lean();

    if (cart) {
      const productIndex = cart.items.findIndex(
        (item) => item?.productId?.toString() == productId?.toString()
      );

      if (productIndex > -1) {
        // Product exists in cart, update quantity
        if (quantity > 0) {
          cart.items[productIndex].quantity = quantity;
        } else {
          // Remove product if quantity is 0
          cart.items.splice(productIndex, 1);
        }
      } else {
        cart.items.push({
          ...product,
          productId: productId.toString(),
          quantity,
        });
      }
      const res = await cart.save();
    } else {
      // Cart does not exist, create a new one
      const newCart = await cartsModel.create({
        userId,
        items: [{ ...product, productId: productId.toString(), quantity }],
      });
      const res = await newCart.save();
    }

    // revalidate the path to update the UI
    revalidatePath("/", "layout");
    return { status: 201 };
  } catch (err) {
    return { status: 500, error: err?.message };
  }
};

export const updatePhone = async (userId, phoneNo) => {
  await dbConnect();
  try {
    const user = await userModel.findById(userId);
    user.phone = phoneNo;
    await user.save();
    revalidatePath("/account", "layout");
    return { message: "updated" };
  } catch (err) {
    return { message: err?.message };
  }
};

export const updateAddress = async (userId, data) => {
  try {
    await dbConnect();

    const userAddress = await userAddressModel.findOne({ userId: userId });
    if (data?.type == "shipping") {
      userAddress.shippingAddress = data?.address;
      await userAddress.save();
      revalidatePath("/account", "layout");

      return { status: 200, message: "updated" };
    } else if (data?.type == "billing") {
      userAddress.billingAddress = data?.address;
      await userAddress.save();
      revalidatePath("/account", "layout");

      return { status: 200, message: "updated" };
    }
  } catch (err) {
    return { status: 500, message: err?.message ?? "Something went wrong" };
  }
};
