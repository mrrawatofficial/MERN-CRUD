import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    profile: String,
  },
  { timestamps: true }
);

const user = mongoose.model("User", UserSchema);
export default user;
