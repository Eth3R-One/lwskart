import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  thumbnail: {
    required: true,
    type: String,
  },
});

export const categoryModel =
  mongoose?.models?.categories ?? mongoose.model("categories", categorySchema);
