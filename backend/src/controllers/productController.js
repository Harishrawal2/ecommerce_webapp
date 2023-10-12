import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

// CREATE PRODUCTS
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ message: "Name is Required" });
      case !description:
        return res.status(500).send({ message: "Description is Required" });
      case !price:
        return res.status(500).send({ message: "Price is Required" });
      case !category:
        return res.status(500).send({ message: "Category is Required" });
      case !quantity:
        return res.status(500).send({ message: "Quantity is Required" });
      case !photo && photo.size > 10000:
        return res
          .status(500)
          .send({ message: "Photo is Required and should be less than 1mb" });
    }

    const products = new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error while creating procduct error" });
  }
};

// GET ALL PRODUCTS
export const getAllProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createAt: -1 });
    res.status(200).send({
      success: true,
      totalProduct: products.length,
      message: "Get All Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Get All Users Error",
    });
  }
};

// GET A SIGNLE PRODUCT
export const getSignleProductsController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Successfull Get A Signle Product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Get a Signle Product",
    });
  }
};

// GET A PRODUCT PHOTO
export const productPhotoController = async (req, res) => {
  try {
    const procduct = await productModel
      .findById(req.params.pid)
      .select("photo");
    if (procduct.photo.data) {
      res.set("Content-Type", procduct.photo.contentType);
      return res.status(200).send(procduct.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "While Error get a product photo",
    });
  }
};

// DELETE PRODUCT
export const deleteProductController = async (req, res) => {
  try {
    const product = await productModel
      .findByIdAndDelete(req.params.pid)
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Delete a Product",
    });
  }
};

// UPDATE PRODUCT
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ message: "Name is Required" });
      case !description:
        return res.status(500).send({ message: "Description is Required" });
      case !price:
        return res.status(500).send({ message: "Price is Required" });
      case !category:
        return res.status(500).send({ message: "Category is Required" });
      case !quantity:
        return res.status(500).send({ message: "Quantity is Required" });
      case photo && photo.size > 10000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};
