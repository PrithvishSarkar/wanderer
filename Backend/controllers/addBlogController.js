import mongoose from "mongoose";
import Blog from "../models/blogSchema.js";
import BlogUser from "../models/userSchema.js";

const addBlogController = async (req, res) => {
  const authorId = req.user.userId; // Got the "authorId" from 'middleware.js'.
  const { title, description } = req.body; // Got these from Frontend.
  // Got the "image" from Multer Midddleware.
  const image = {
    imageBufferData: req.file.buffer,
    imageSize: req.file.size,
    imageContentType: req.file.mimetype,
    imageName: req.file.originalname,
  };

  /*
  The Frontend data are trimmed first, then sent here.
  Frontend will check before sending, this is a double check.
  */
  if (!title.trim() || !description.trim()) {
    res.status(400).json({ status: "failure", message: "Missing Details!" });
    return;
  }

  /*
  Figuring out if the 'Author ID' from Protected Middleware is valid or not.
  Checking if the user corresponding to 'authorId' exists or not.
  */
  const userData = await BlogUser.findById({ _id: authorId });
  if (!mongoose.Types.ObjectId.isValid(authorId) || !userData) {
    res.status(400).json({ status: "failure", message: "User Not Found!" });
    return;
  }

  // Storing Data in MongoDB.
  try {
    const blogDetails = await Blog.create({
      title,
      description,
      image,
      authorId,
    });

    // Removing unncessary data before sending response to Frontend.
    const blogData = blogDetails.toObject();
    delete blogData["__v"];
    delete blogData["createdAt"];

    res.status(201).json({
      status: "success",
      message: "Blog Added Successfully!",
      blog: blogData,
    });
  } catch (err) {
    res.status(500).json({ status: "failure", message: err.message });
  }
};

export default addBlogController;
