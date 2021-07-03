import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    title: String,
    img: String,
    description: String,
    user: {
      name: String,
      profile: String,
    },
  },
  { timestamps: true }
);

const post = mongoose.model("Post", PostSchema);
export default post;
