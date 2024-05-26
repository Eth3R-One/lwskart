import mongoose from "mongoose";

const { Schema } = mongoose;

const wishlistSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const wishlistModel =
  mongoose?.models?.wishlists ?? mongoose.model("wishlists", wishlistSchema);
