import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.controllers.js";

import { Router } from "express";
import { verifyAccessToken } from "../middlewares/Verifications.js";
import { verifyPostOwner } from "../middlewares/Post.middleware.js";

const router = Router();
// CREATE POST
router.post("/", verifyAccessToken, createPost);

// READ POSTS
router.get("/", getPosts); 

// UPDATE POST
router.put("/:id", verifyAccessToken, verifyPostOwner, updatePost);
// READ POST BY ID
router.get("/post", getPost)

// DELETE POST
router.delete("/:id", verifyAccessToken, verifyPostOwner, deletePost);

export default router;