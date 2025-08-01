import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: {
      imageBufferData: { type: Buffer, required: true },
      imageName: { type: String, required: true },
      imageContentType: { type: String, required: true },
      imageSize: { type: Number, required: true },
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
