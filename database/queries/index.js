import cartsModel from "@/models/cart-model";
import { categoryModel } from "@/models/category-model";
import { productModel } from "@/models/product-model";
import { userModel } from "@/models/user-model";
import { wishlistModel } from "@/models/wishlist-model";
import { dbConnect } from "@/service/mongo";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-utils";
import mongoose, { mongo } from "mongoose";

export const getUserById = async (userId) => {
  await dbConnect();
  try {
    const user = await userModel.findById(userId).lean();
    if (user) {
      return replaceMongoIdInObject(user);
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getUserByEmail = async (userEmail) => {
  await dbConnect();
  try {
    const user = await userModel.findOne({ email: userEmail }).lean();
    if (user) {
      return replaceMongoIdInObject(user);
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    throw err;
  }
};

export const getProducts = async () => {
  await dbConnect();
  try {
    const products = await productModel.find().lean();
    return replaceMongoIdInArray(products);
  } catch (err) {
    console.log(err);
  }
};

export const getProductById = async (productId) => {
  await dbConnect();
  try {
    if (mongoose.Types.ObjectId.isValid(productId)) {
      const product = await productModel.findOne({ _id: productId }).lean();
      return replaceMongoIdInObject(product);
    }
    return undefined;
  } catch (err) {
    throw err;
  }
};

export const getCategories = async () => {
  await dbConnect();
  try {
    const categories = await categoryModel.find().lean();

    return replaceMongoIdInArray(categories);
  } catch (err) {
    throw err;
  }
};

export const getWishList = async (userId) => {
  await dbConnect();

  try {
    const wishList = await wishlistModel
      .findOne({ userId })
      .populate("products");
    return wishList;
  } catch (err) {
    console.error(err);
    return { status: 500, error: "Failed to fetch wishlist" };
  }
};

export const getCartItems = async (userId) => {
  await dbConnect();
  try {
    const cartItems = await cartsModel.findOne({ userId: userId }).lean();
    return replaceMongoIdInArray(cartItems?.items);
  } catch (err) {
    console.log(err);
  }
};
