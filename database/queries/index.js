import { categoryModel } from "@/models/category-model";
import { productModel } from "@/models/product-model";
import { dbConnect } from "@/service/mongo";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-utils";
import mongoose, { mongo } from "mongoose";

export const getProducts = async () => {
  await dbConnect();
  const products = await productModel.find().lean();

  return replaceMongoIdInArray(products);
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
