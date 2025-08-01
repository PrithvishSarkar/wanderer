import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import BlogUser from "../models/userSchema.js";

const registerController = async (req, res) => {
  // Fetching Form Data from Frontend
  const { name, email, password } = req.body;

  // Check if user has sent all the data or not
  if (!name || !email || !password) {
    res.status(400).json({ status: "failure", message: "Missing Credentials" });
    return;
  }
  try {
    // Checking if user already exists or not
    const userDataFromDb = await BlogUser.findOne({ email }).select({
      password: 0,
    });
    if (userDataFromDb) {
      res
        .status(400)
        .json({ status: "failure", message: "User Already Exists!" });
      return;
    }

    // Hash Password before sending it to the Database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Send data to Database
    const createdUserData = await BlogUser.create({
      name,
      email,
      password: hashedPassword,
    });

    // Remove Password and unncessary data before sending response to Frontend
    const { _id, name: userName } = createdUserData.toObject();

    // Sign the Token using created user's `_id` as payload
    const token = jwt.sign(
      { userId: _id.toString() },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    /*
    I use `require("crypto").randomBytes(32).toString("hex")` to generate JWT Secret Key.
    I console log the above code to generate my 32 bytes JWT Secret Key.
    The JWT Secret Key must be of 32 bytes (256 bits) for HS256 algorithm (default algo).
    */

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("blog_token", token, {
      maxAge: 7 * 24 * 3600 * 1000,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "Lax",
    });

    // Sending appropriate response to Frontend including 'user data'
    res.status(201).json({
      status: "success",
      message: "User Created Successfully",
      userData: { _id, name: userName },
    });
  } catch (err) {
    console.error("Registration Error: ", err);
    res.status(500).json({ status: "failure", message: err.message });
  }
};

export default registerController;
