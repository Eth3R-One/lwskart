"use server";

import { signIn } from "@/auth";
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
    console.error(err);
    return { status: 500, error: err.message };
  }
};
