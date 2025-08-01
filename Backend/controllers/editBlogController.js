import Blog from "../models/blogSchema.js";

const editBlogController = async (req, res) => {
  const blogId = req.params.id;
  const { title, description } = req.body;
  const image = {
    imageBufferData: req.file.buffer,
    imageSize: req.file.size,
    imageContentType: req.file.mimetype,
    imageName: req.file.originalname,
  };

  // Check if the Frontend data is valid or not.
  if (!title || !description || !image) {
    res
      .status(400)
      .json({ status: "failure", message: "Missing Credentials!" });
    return;
  }

  try {
    const updatedData = await Blog.findByIdAndUpdate(
      { _id: blogId },
      { $set: { title, description, image } },
      { new: true }
    ).select({ __v: 0, createdAt: 0 });

    if (!updatedData) {
      res.status(400).json({ status: "failure", message: "Blog Not Found!" });
      return;
    }
    
    // Sending Appropriate Response to Frontend.
    res.status(200).json({
      status: "success",
      message: "Blog Updated Successfully!",
    });
  } catch (err) {
    res.status(500).json({ status: "failure", message: err.message });
  }
};

export default editBlogController;
