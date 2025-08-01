import Blog from "../models/blogSchema.js";
import BlogUser from "../models/userSchema.js";

const getSingleBlogController = async (req, res) => {
  const blogId = req.params.id;
  try {
    const singleBlogData = await Blog.findById({ _id: blogId }).select({
      __v: 0,
      createdAt: 0,
    });

    // Sending Response if Blog Not Found.
    if (!singleBlogData) {
      res
        .status(404)
        .json({ status: "failure", message: "Blog Not Found!", blog: null });
      return;
    }

    // Extracting Author's Name when Blog Found Successfully.
    const { name: authorName } = await BlogUser.findById({
      _id: singleBlogData.authorId,
    });

    // Converting Image Buffer Data to base64 String.
    const imageBase64String =
      singleBlogData.image.imageBufferData.toString("base64");
    const image = {
      imageData: imageBase64String,
      imageName: singleBlogData.image.imageName,
      imageContentType: singleBlogData.image.imageContentType,
      imageSize: singleBlogData.image.imageSize,
    };

    // Sending Appropriate Response to Frontend.
    const { title, description, updatedAt } = singleBlogData;
    const blog = { title, description, authorName, updatedAt, image };
    res
      .status(200)
      .json({ status: "success", message: "Blog Fetched Successfully!", blog });
  } catch (err) {
    res.status(500).json({ status: "failure", message: err.message });
  }
};

export default getSingleBlogController;
