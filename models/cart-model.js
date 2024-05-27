import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  userId: {
    required: true,
    type: mongoose.Types.ObjectId,
  },
  productDetails: {
    required: true,
    type: Array,
  },
});

export const cartModel =
  mongoose.models.cart ?? mongoose.model("cart", cartSchema);
