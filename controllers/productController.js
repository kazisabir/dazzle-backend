import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

export const getProductDetails = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.status(200).json(product);
};

export const filterProducts = async (req, res) => {
  const { category, type, size, color, price } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (type) filter.type = type;
  if (price) filter.price = { $lte: price };
  if (size || color) {
    filter.skus = { $elemMatch: {} };
    if (size) filter.skus.$elemMatch.size = size;
    if (color) filter.skus.$elemMatch.color = color;
  }

  const products = await Product.find(filter);
  res.json(products);
};
