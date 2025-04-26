const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  skuId: { type: String },
  quantity: { type: Number },
  title: String,
  description: String,
  category: String,
  type: String,
  size: String,
  color: String,
  price: Number
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [itemSchema], // ✅ Now accepts objects
  totalAmount: Number,
  paymentStatus: String,
  status: { type: String, enum: ['processing', 'shipped', 'delivered', 'cancelled'], default: 'processing' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
