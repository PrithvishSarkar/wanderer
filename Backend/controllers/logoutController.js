const logoutController = (_, res) => {
  res.cookie("blog_token", "", {
    maxAge: 0,
  });
  res
    .status(200)
    .json({ status: "success", message: "User Logged Out Successfully!" });
};

export default logoutController;
