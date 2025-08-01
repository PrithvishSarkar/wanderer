import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const protectedRouteMiddleware = (req, res, next) => {
  const token = req.cookies.blog_token;

  // Check if token exists or not.
  if (!token) {
    res.status(401).json({
      status: "failure",
      message: "Token Not Found - Unauthorized User!",
      instructions: "Redirect to Landing Page",
      redirectPath: "/", // This path is for Frontend only.
    });
    return;
  }

  // Verify Token, given that it exists.
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    console.error("Token Verification Error: ", err);
    res
      .status(401)
      .json({
        status: "failure",
        message: "Unverified Token - Unauthorized User!",
        instructions: "Redirect to Login Page",
        redirectPath: "/login",
      });
    return;
  }
};

export default protectedRouteMiddleware;
