import express from "express";
import { AdminRoute, RequireRoute } from "../middleware/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getSignleProductsController,
  productPhotoController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// Router - CREATE PRODUCTS
router.post(
  "/create-product",
  RequireRoute,
  AdminRoute,
  formidable(),
  createProductController
);

// Router - GET PRODUCTS
router.get("/get-products", getAllProductsController);

// Router - GET A PRODUCT
router.get("/get-product/:slug", getSignleProductsController);

// Router - GET PRODUCT PHOTO
router.get("/product-photo/:pid", productPhotoController);

// Router - DELETE PRODUCT
router.delete("/delete-product/:pid", deleteProductController);

router.put(
  "/update-product/:pid",
  RequireRoute,
  AdminRoute,
  updateProductController
);

export default router;
