import { ComparePassword, hashPassword } from "../helpers/authHelper.js";
import User from "../models/userModel.js";
import JWT from "jsonwebtoken";

// Register the User
export const RegisterController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    // validation
    if (!name) {
      return res.send({ success: false, message: "Name is required" });
    }
    if (!email) {
      return res.send({ success: false, message: "Email is required" });
    }
    if (!password) {
      return res.send({ success: false, message: "Password is required" });
    }
    if (!phone) {
      return res.send({ success: false, message: "Phone is required" });
    }
    if (!address) {
      return res.send({ success: false, message: "Address is required" });
    }

    if (!answer) {
      return res.send({ success: false, message: "Answer is required" });
    }

    // existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: false, message: "User already exists, Please login" });
    }

    // Register User

    const hashedPassword = await hashPassword(password);

    // save user
    const user = await new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    }).save();

    res
      .status(201)
      .send({ success: true, message: "Registration Successfull", user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Registration failed", error });
  }
};

// Login the user
export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation

    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "Email and Password are required" });
    }

    // check if the user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User does not exist" });
    }

    // password comparison
    const matchPassword = await ComparePassword(password, user.password);

    if (!matchPassword) {
      return res
        .status(404)
        .send({ success: false, message: "Password is incorrect" });
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfull",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: user.token,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Login failed", error });
  }
};

// forgot password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({
        message: "Email is required",
      });
    }

    if (!answer) {
      res.status(400).send({
        message: "Answer is required",
      });
    }

    if (!newPassword) {
      res.status(400).send({
        message: "New Password is required",
      });
    }

    // check
    const user = await User.findOne({ email, answer });

    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }

    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Pasword Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

// testing controller
export const testController = (req, res) => {
  res.status(200).send({ success: true, message: "Protected" });
};
