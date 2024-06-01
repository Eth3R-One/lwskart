import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
  userId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  shippingAddress: {
    required: false,
    type: String,
  },

  billingAddress: {
    required: false,
    type: String,
  },
});

export const userAddressModel =
  mongoose?.models?.address ?? mongoose.model("address", addressSchema);
