import Blog from "../models/blogSchema.js";
import BlogUser from "../models/userSchema.js";

const getAllBlogsController = async (_, res) => {
  try {
    const allBlogs = await Blog.find({}).select({ __v: 0, createdAt: 0 });

    if (!allBlogs.length) {
      return res.status(200).json({
        status: "success",
        message: "Blogs Fetched Successfully!",
        blogs: null,
      });
    }

    /*
    Create an Array of Promises to be resolved.
    Since the 'callback' function is 'async', so each item returns a Promise.
    */
    const blogPromises = allBlogs.map(async (blog) => {
      const imageBase64String = blog.image.imageBufferData.toString("base64");
      const image = {
        imageData: imageBase64String,
        imageName: blog.image.imageName,
        imageContentType: blog.image.imageContentType,
        imageSize: blog.image.imageSize,
      };
      const { _id, title, description, authorId, updatedAt } = blog;
      const { name: authorName } = await BlogUser.findById({ _id: authorId });
      return {
        _id,
        title,
        description,
        authorName,
        updatedAt,
        image,
      };
    });

    // Resolve all Promises.
    const blogs = await Promise.all(blogPromises);

    res.status(200).json({
      status: "success",
      message: "Blogs Fetched Successfully!",
      blogs,
    });
  } catch (err) {
    res.status(500).json({ status: "failure", message: err.message });
  }
};

export default getAllBlogsController;
