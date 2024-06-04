import cartsModel from "@/models/cart-model";
import { categoryModel } from "@/models/category-model";
import orderModel from "@/models/order-model";
import { productModel } from "@/models/product-model";
import { userAddressModel } from "@/models/user-address-model";
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
      return replaceMongoIdInObject({ ...user, password: null });
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
    const cart = await cartsModel.findOne({ userId }).lean();

    if (cart && cart.items) {
      const updatedCartItems = await Promise.all(
        cart.items.map(async (item) => {
          const prod = await productModel.findById(item.productId).lean();
          return { ...item, product: replaceMongoIdInObject(prod) };
        })
      );

      return replaceMongoIdInArray(
        updatedCartItems.map((item) => ({
          ...item,
          productId: item.productId.toString(),
        }))
      );
    }

    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getUserAddress = async (userId) => {
  await dbConnect();
  try {
    const userAddress = await userAddressModel
      .findOne({ userId: userId })
      .lean();
    return replaceMongoIdInObject({
      ...userAddress,
      userId: userAddress?.userId?.toString(),
    });
  } catch (err) {
    console.log(err);
  }
};

export const getOrderHistory = async (userId) => {
  try {
    await dbConnect();

    const orders = await orderModel.find({ userId }).lean();

    if (orders.length > 0) {
      return replaceMongoIdInArray(orders);
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
  }
};

export const getNewArrival = async () => {
  try {
    await dbConnect();
    const products = await getProducts();

    return products
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      ?.slice(0, 12);
  } catch (err) {
    console.log(err);
  }
};

export const getTrendingProducts = async () => {
  try {
    await dbConnect();
    const products = await getProducts();
    return products
      .sort((a, b) => {
        const aTrendScore = a.rating * a.feedBack.reviews;
        const bTrendScore = b.rating * b.feedBack.reviews;
        return bTrendScore - aTrendScore;
      })
      .slice(0, 8);
  } catch (err) {
    console.log(err);
  }
};

export const getRelatedProducts = async (currentProduct) => {
  try {
    await dbConnect();
    const { category, id, price } = currentProduct;
    const products = await getProducts();
    let relatedProducts = products.filter(
      (product) =>
        product.category?.toString() === category.toString() && product.id != id
    );

    return relatedProducts.slice(
      0,
      relatedProducts?.length > 8 ? 8 : relatedProducts?.length
    );
  } catch (err) {
    console.log(err);
  }
};
