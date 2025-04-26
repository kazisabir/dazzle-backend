import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    console.log("user", user._id);
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isAuthenticated = await bcrypt.compare(password, user.password);

    if (isAuthenticated) {
      const token = jwt.sign(
        { id: user._id, email: email, role: "user" },
        process.env.JWT_SECRET
      );
      //   req.user.id = email;
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ message: "Logged in successfully 😊 👌" });
    } else {
      return res.status(200).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    return res.status(500).json({ message: "something went wrong" });
  }
};
