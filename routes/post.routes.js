import { createPost, getPost, getPosts } from "../controllers/post.controllers.js";

import { Router } from "express";

const router = Router();
// CREATE POST
router.post("/", createPost);

// READ POSTS
router.get("/", getPosts); 
// READ POST BY ID
router.get("/post", getPost)

export default router;