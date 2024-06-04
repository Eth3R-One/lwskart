import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema({
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
  thumbnail: {
    type: String,
    required: true,
  },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
  },
});

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["Card", "Cash-on-Delivery"],
      required: true,
    },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    billingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentDetails: {
      cardNumber: {
        type: Number,
      },
      nameOnCard: {
        type: String,
      },
      expireDate: {
        type: Date,
      },
      cvv: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

const orderModel =
  mongoose?.models?.orders ?? mongoose?.model("orders", orderSchema);

export default orderModel;
