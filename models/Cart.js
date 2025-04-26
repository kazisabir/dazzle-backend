import mongoose from "mongoose";

const CartScheme = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        skuId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productSKUS",
          required: true,
        },
        title: String,
        description: String,
        category: String,
        // type: String,
        price: Number,
        color: String,
        size: String,
        images: { type: [String], required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartScheme);
