import Posts from "../models/posts.js";

export const verifyPostOwner = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Posts.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    // Check if the user is the owner of the post || the user is an admin
    if (post.writer.toString() === req.user.id || req.user.role === "admin") {
      next();
    }
    
    return res.status(403).json({
      success: false,
      message: "You are not allowed to perform this action",
    });
  } catch (error) {
    next(error);
  }
};
