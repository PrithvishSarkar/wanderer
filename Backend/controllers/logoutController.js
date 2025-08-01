const logoutController = (_, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("blog_token", "", {
    httpOnly: true,
    maxAge: 0,
    secure: isProduction,
    sameSite: isProduction ? "none" : "Lax",
  });
  res
    .status(200)
    .json({ status: "success", message: "User Logged Out Successfully!" });
};

export default logoutController;
