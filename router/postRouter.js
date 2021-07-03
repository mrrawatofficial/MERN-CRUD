import express, { Router } from "express";
import {
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
} from "../controller/post-controller.js";

const router = express.Router();

router.post("/create", createPost);
router.get("/posts", getAllPosts);
router.delete("/delete/:id", deletePost);
router.put("/update/:id", updatePost);

export default router;
