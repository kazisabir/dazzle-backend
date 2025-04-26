import mongoose from "mongoose";

const productSKUSchema = new mongoose.Schema({
  color: String,
  size: String,
  quantity: Number,
  images: { type: [String], required: true },
});

export default mongoose.model("productSKUS", productSKUSchema);
