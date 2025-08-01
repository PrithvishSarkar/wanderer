import mongoose from "mongoose";
import Blog from "../models/blogSchema.js";

const deleteBlogController = async (req, res) => {
  const blogId = req.params.id;

  // Checking if the `blogId` is valid or not.
  if (!blogId || !mongoose.Types.ObjectId.isValid(blogId)) {
    res.status(400).json({ status: "failure", message: "Invalid Blog ID!" });
    return;
  }
  try {
    const deletedBlog = await Blog.findByIdAndDelete({ _id: blogId });
    // The `deletedBlog` is the document which was deleted.
    if (!deletedBlog) {
      res.status(404).json({
        status: "failure",
        message: "Blog Not Found!",
      });
      return;
    }

    // Sending appropriate response to the Frontend.
    res.status(200).json({
      status: "success",
      message: "Blog Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).json({ status: "failure", message: err.message });
  }
};

export default deleteBlogController;
