import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
  },
  rating: {
    type: Number,
  },
  quantity: {
    type: Number,
  },

  brand: {
    type: String,
  },
  category: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  sku: {
    type: String,
  },
  attributes: [
    {
      key: String,
      value: String,
    },
  ],
  feedBack: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      comment: String,
      rating: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const productModel =
  mongoose?.models?.products || mongoose.model("products", productSchema);
