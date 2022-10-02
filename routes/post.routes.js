import { createPost, getPost, getPosts, updatePost } from "../controllers/post.controllers.js";

import { Router } from "express";
import { verifyAccessToken } from "../middlewares/Verifications.js";

const router = Router();
// CREATE POST
router.post("/", verifyAccessToken, createPost);

// READ POSTS
router.get("/", getPosts); 

// UPDATE POST
router.put("/:id", verifyAccessToken, updatePost);
// READ POST BY ID
router.get("/post", getPost)

export default router;