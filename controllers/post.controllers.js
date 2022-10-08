import Post from "../models/posts.js";
import createError from "../utils/Error.js";

const createPost = async (req, res, next) => {
  req.body.writer = req.user.id; // Append user id to req.body
  try {
    const post = new Post(req.body);
    await post.save();

    res.status(201).json({
      success: true,
      message: "Post added successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// READ POSTS
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      total: posts.length,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

// READ POST BY ID
const getPost = async (req, res, next) => {
  let { key, value } = req.params;
  if (!key) key = "_id";
  const keys = ["_id", "title", "writer", "createdAt"];
  if (!keys.includes(key)) {
    return res.status(400).json({
      success: false,
      message: "Invalid query key <[_id, title, writer, createdAt]>",
    });
  }
  if (!value) {
    return next(createError("Invalid query value", 400));
  }
  try {
    const post = await Post.findOne({ [key]: value });

    // throw error if post not found
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post retrieved successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE POST
const updatePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE POST
const deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// PUBLISH POST
const publishPost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { status: "published" },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post published successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// REVERT POST TO DRAFT
const revertPost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { status: "draft" },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post reverted to draft successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  publishPost,
  revertPost,
};
