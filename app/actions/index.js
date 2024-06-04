"use server";

import { signIn } from "@/auth";
import { getCartItems, getProductById } from "@/database/queries";
import cartsModel from "@/models/cart-model";
import orderModel from "@/models/order-model";
import { productModel } from "@/models/product-model";
import { userAddressModel } from "@/models/user-address-model";
import { userModel } from "@/models/user-model";
import { wishlistModel } from "@/models/wishlist-model";
import { dbConnect } from "@/service/mongo";
import { replaceMongoIdInObject } from "@/utils/data-utils";
import { getDiscountPrice } from "@/utils/discount-price-utils";
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
        if (quantity > 0) {
          cart.items[productIndex].quantity = quantity;
        } else {
          cart.items.splice(productIndex, 1);
        }
      } else {
        cart.items.push({
          ...product,
          productId: productId.toString(),
          quantity,
          productQuantity: product?.quantity,
        });
      }
      const res = await cart.save();
    } else {
      const newCart = await cartsModel.create({
        userId,
        items: [
          {
            ...product,
            productId: productId.toString(),
            quantity,
            productQuantity: product?.quantity,
          },
        ],
      });
      const res = await newCart.save();
    }

    revalidatePath("/", "layout");
    return { status: 200 };
  } catch (err) {
    console.log(err);
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

    let userAddress;
    userAddress = await userAddressModel.findOne({ userId: userId });

    if (!userAddress) {
      userAddress = await userAddressModel.create({ userId });
    }
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

export const addOrder = async (userId, formData, paymentDetails) => {
  try {
    await dbConnect();

    const shippingAddress = {};
    const billingAddress = {};

    const name = formData.get("fname") + " " + formData.get("lname");
    const phone = formData.get("phone");
    const email = formData.get("email");

    billingAddress.street = formData.get("billingStreetAddress");
    billingAddress.city = formData.get("billingCity");
    billingAddress.country = formData.get("billingCountry");

    shippingAddress.street = formData.get("shippingStreetAddress");
    shippingAddress.city = formData.get("shippingCity");
    shippingAddress.country = formData.get("shippingCountry");

    let paymentMethod;
    let paymentStatus;
    const paymentDetailsForDB = {};

    const paymentType = paymentDetails?.paymentType;

    if (paymentType == "card") {
      paymentMethod = "Card";
      paymentStatus = "Paid";
      paymentDetailsForDB.cardNumber = paymentDetails?.cardNumber;
      paymentDetailsForDB.nameOnCard = paymentDetails?.nameOnCard;
      paymentDetailsForDB.expireDate = paymentDetails?.expireDate;
      paymentDetailsForDB.cvv = paymentDetails?.cvv;
    }
    if (paymentType == "cash") {
      paymentMethod = "Cash-on-Delivery";
      paymentStatus = "Pending";
    }

    const cartDetails = await getCartItems(userId);
    let totalAmount = 0;

    for (let i = 0; i < cartDetails?.length; i++) {
      const cart = cartDetails[i];
      totalAmount +=
        cart?.quantity *
        getDiscountPrice(
          cart?.product?.price,
          cart?.product?.discountPercentage
        );
    }

    const orderObject = {
      userId,
      name,
      phone,
      items: cartDetails,
      totalAmount,
      paymentStatus,
      paymentMethod,
      paymentDetails,
      billingAddress,
      shippingAddress,
    };

    const order = await orderModel.create(orderObject);

    const cart = await cartsModel.findOne({ userId });

    cart.items.splice(0, cart?.items?.length);

    await cart.save();
    await updateQuantityInProduct(order);

    return { status: 200, message: "added" };
  } catch (err) {
    console.log(err);
    return { status: 500, message: err?.message ?? "Something went wrong" };
  }
};

const updateQuantityInProduct = async (order) => {
  try {
    await dbConnect();
    for (let i = 0; i < order?.items.length; i++) {
      const item = order?.items[i];
      const productToBeUpdate = await productModel.findById(item?.productId);
      productToBeUpdate.quantity = productToBeUpdate.quantity - item?.quantity;
      await productToBeUpdate.save();
    }
  } catch (err) {
    console.log(err);
  }
};
