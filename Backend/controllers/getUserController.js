import BlogUser from "../models/userSchema.js";

const getUserController = async (req, res) => {
  const userId = req.user.userId;
  try {
    const { _id, name } = await BlogUser.findById({ _id: userId });
    if (!_id || !name) {
      res.status(400).json({ status: "failure", message: "User Not Found!" });
      return;
    }
    res.status(200).json({
      status: "success",
      message: "User Verified Successfully!",
      userData: { _id, name },
    });
  } catch (err) {
    res.status(500).json({ status: "failure", message: err.message });
  }
};

export default getUserController;
