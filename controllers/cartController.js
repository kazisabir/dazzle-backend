import mongoose from "mongoose";
import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    console.log("User Object:", req.user); // Debugging

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const userId = req.user.id; // ✅ Ensure we use `id`, not email
    console.log("userId", userId);
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const {
      productId,
      skuId,
      quantity,
      category,
      type,
      size,
      color,
      price,
      title,
      description,
    } = req.body;
    console.log("body", req.body);
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    console.log("cartQQ", cart);

    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() === productId &&
        item.skuId.toString() === skuId
    );
    console.log("existingItem", existingItem);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        ...req.body,
      });
    }
    console.log("cart", cart);

    await cart.save();
    return res.json({ message: "Item added to cart", cart });
  } catch (err) {
    console.error("Error:", err);
    if (!res.headersSent) {
      // ✅ Prevent multiple responses
      return res.status(500).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    // Filter only the selected color images
    // const formattedCart = {
    //   userId: cart.userId,
    //   items: cart.items.map((item) => {
    //     const product = item.productId;
    //     // const selectedColorImages = product.images[item.selectedColor] || [];

    //     return {
    //       _id: item._id,
    //       productId: product._id,
    //       title: product.title,
    //       price: product.price,
    //       category: product.category,
    //       description: product.description,
    //       selectedColor: item.selectedColor,
    //       selectedSize: item.selectedSize,
    //       quantity: item.quantity,
    //       //   images: selectedColorImages, // Only images for the selected color
    //     };
    //   }),
    // };

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeCart = async (req, res) => {
  try {
    const { productId, selectedColor, selectedSize } = req.body;
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the item that matches the productId, selectedColor, and selectedSize
    cart.items = cart.items.filter(
      (item) =>
        item.productId.toString() !== productId ||
        item.selectedColor !== selectedColor ||
        item.selectedSize !== selectedSize
    );

    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
