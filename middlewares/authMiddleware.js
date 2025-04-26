import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const { access_token } = req.cookies;
    console.log("process.env.JWT_SECTRT", process.env.JWT_SECRET);
    var { id, email } = jwt.verify(access_token, process.env.JWT_SECRET);
    if (!req.user) {
      req.user = { id: id };
    }
    console.log("access_token", id);
    // req.user = id;
    const user = await User.findOne({ email: email });
    console.log("user", user);

    if (!user) {
      throw new Error("User not authorise");
    } else {
      next();
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
