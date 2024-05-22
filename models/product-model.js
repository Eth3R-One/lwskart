import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  discountPercentage: {
    require: false,
    type: Number,
    min: 0,
    max: 100,
  },
  rating: {
    require: false,
    type: Number,
  },
  stock: {
    require: false,
    type: Array,
  },
  brand: {
    require: false,
    type: String,
  },
  category: {
    require: false,
    type: String,
  },
  thumbnail: {
    require: false,
    type: String,
  },
  images: {
    require: false,
    type: Array,
  },
  sku: {
    require: false,
    type: String,
  },
  attributes: {
    require: false,
    type: Array,
  },
  feedBack: {
    require: false,
    type: Array,
  },
  createdAt: {
    require: false,
    type: String,
  },
});

export const productModel =
  mongoose.models.products ?? mongoose.model("products", productSchema);
