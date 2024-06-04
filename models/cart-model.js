import mongoose, { Schema } from "mongoose";

const cartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
  },
});

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

const cartsModel =
  mongoose?.models?.carts ?? mongoose.model("carts", cartSchema);

export default cartsModel;
