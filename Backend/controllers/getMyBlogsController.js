import Blog from "../models/blogSchema.js";
import BlogUser from "../models/userSchema.js";

const getMyBlogsController = async (req, res) => {
  const authorId = req.user.userId;
  try {
    const { name: authorName } = await BlogUser.findById({ _id: authorId });
    const myBlogs = await Blog.find({ authorId }).select({
      createdAt: 0,
      __v: 0,
      authorId: 0,
    });
    if (!myBlogs.length) {
      res.status(200).json({
        status: "success",
        message: "Blogs Fetched Successfully!",
        blogs: null,
      });
      return;
    }

    // Populating 'blogs' Array before sending to Frontend.
    const blogs = [];
    myBlogs.forEach((blog) => {
      const imageBase64String = blog.image.imageBufferData.toString("base64");
      const image = {
        imageData: imageBase64String,
        imageName: blog.image.imageName,
        imageContentType: blog.image.imageContentType,
        imageSize: blog.image.imageSize,
      };
      const { _id, title, description, updatedAt } = blog;
      blogs.push({
        _id,
        title,
        description,
        authorName,
        updatedAt,
        image,
      });
    });

    // Sending Appropriate Response.
    res
      .status(200)
      .json({
        status: "success",
        message: "Blogs Fetched Successfully!",
        blogs,
      });
  } catch (err) {
    res.status(500).json({ status: "failure", message: err.message });
  }
};

export default getMyBlogsController;
