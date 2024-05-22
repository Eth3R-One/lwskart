import { productModel } from "@/models/product-model";
import { dbConnect } from "@/service/mongo";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-utils";

export const getProducts = async () => {
  await dbConnect();
  const products = await productModel.find().lean();

  return replaceMongoIdInArray(products);
};

export const getProductById = async (productId) => {
  await dbConnect();
  try {
    const product = await productModel.findById(productId).lean();
    return replaceMongoIdInObject(product);
  } catch (err) {}
};
