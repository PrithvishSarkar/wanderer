import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import BlogUser from "../models/userSchema.js";

const loginController = async (req, res) => {
  const { email, password } = req.body;

  // Check if the user has sent all the credentials or not
  if (!email || !password) {
    res.status(400).json({ status: "failure", message: "Missing Credentials" });
    return;
  }
  try {
    // Check if user exists or not => Email is correct or not
    const userDataFromDb = await BlogUser.findOne({ email });
    if (!userDataFromDb) {
      res.status(404).json({ status: "failure", message: "User Not Found!" });
      return;
    }

    // Verify if password is correct or not
    const isPasswordMatched = await bcrypt.compare(
      password,
      userDataFromDb.password
    );
    if (!isPasswordMatched) {
      res
        .status(401)
        .json({ status: "failure", message: "Unauthorized User!" });
      return;
    }

    // Remove Password and unncessary data before sending response to Frontend.
    const { _id, name } = userDataFromDb.toObject();

    // Sign the Token using created user's `_id` as payload
    const token = jwt.sign(
      { userId: _id.toString() },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 7 * 24 * 3600 * 1000,
      }
    );

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("blog_token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 3600 * 1000,
      secure: isProduction,
      sameSite: isProduction ? "none" : "Lax",
    });

    // Sending appropriate response to Frontend
    res.status(200).json({
      status: "success",
      message: "User Logged In Successfully",
      userData: { _id, name },
    });
  } catch (err) {
    res.status(500).json({ status: "failure", message: err.message });
  }
};

export default loginController;
