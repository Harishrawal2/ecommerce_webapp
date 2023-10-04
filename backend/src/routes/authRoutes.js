import express from "express";
import {
  LoginController,
  RegisterController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { AdminRoute, RequireRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// REGISTER USER || POST
router.post("/register", RegisterController);

// LOGIN USER || POST
router.post("/login", LoginController);

//FORGET PASSWORD || POST
router.post("/forgot-password", forgotPasswordController);

//TEST ROUTE || GET
router.get("/test", RequireRoute, AdminRoute, testController);

//AUTH USER PROTECT ROUTE || GET
router.get("/user-auth", RequireRoute, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

//AUTH ADMIN PROTECT ROUTE || GET
router.get("/admin-auth", RequireRoute, AdminRoute, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

export default router;
