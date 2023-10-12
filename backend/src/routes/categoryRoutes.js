import express from "express";
import { AdminRoute, RequireRoute } from "../middleware/authMiddleware.js";
import {
  DeleteCategoryController,
  createCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

// routes
router.post(
  "/create-category",
  RequireRoute,
  AdminRoute,
  createCategoryController
);

// update category
router.put(
  "/update-category/:id",
  RequireRoute,
  AdminRoute,
  updateCategoryController
);

// Get All category
router.get("/catagories", getAllCategoryController);

// Get Single category
router.get("/signle-category/:slug", getSingleCategoryController);

// Delete Single category
router.delete(
  "/delete-category/:id",
  RequireRoute,
  AdminRoute,
  DeleteCategoryController
);

export default router;
