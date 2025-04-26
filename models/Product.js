import mongoose from "mongoose";

const productSKUSchema = new mongoose.Schema({
  color: String,
  size: String,
  availableStock: Number,
  images: { type: [String], required: true },
});

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: {
      type: String,
      enum: ["men", "women", "kids", "trending", "new"],
    },
    type: { type: String, enum: ["shoes", "clothing", "accessories"] },
    price: Number,
    images: [String],
    skus: [productSKUSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
