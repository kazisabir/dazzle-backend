import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductDetails,
} from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProduct);
router.get("/", authMiddleware, getAllProducts);
router.get("/:id", getProductDetails);
// router.put("/:id", authMiddleware, updateProduct);
// router.delete("/:id", authMiddleware, deleteProduct);
// router.get("/similar/:id", getSimilarProducts);

export default router;
