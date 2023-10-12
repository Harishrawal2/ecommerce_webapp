import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import mongoConnect from "./src/config/db.js";
import morgan from "morgan";
import userRoutes from "./src/routes/authRoutes.js";
import cors from "cors";
import categoryRoute from "./src/routes/categoryRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";

// Environment variables configuration
dotenv.config();

// Express configuration
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

// DB configuration
mongoConnect();

// API configuration
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/products", productRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(
    `Server listening on ${process.env.DEV_MODE} mode port http://localhost:${port}`
      .bgCyan.white
  );
});
