import express, { Router } from "express";
import {
  registerUser,
  getAllUsers,
  loginUser,
  deleteUser,
  updateUser,
} from "../controller/user-controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/all", getAllUsers);
userRouter.delete("/delete/:id", deleteUser);
// userRouter.put("/update/:id", updatePost);

export default userRouter;
