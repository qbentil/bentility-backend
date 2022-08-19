import Post from "../models/posts.js";
import createError from "../utils/Error.js";

const createPost = async (req, res, next) => {
    req.body.writer = req.user.id; // Append user id to req.body
    try {
        const post = new Post(req.body);
        await post.save();
        
        // remove isPublished property from response
        const { isPublished, ...rest } = post.toObject();

        res.status(201).json({
            success: true,
            message: "Post added successfully",
            post: rest,
        })
    } catch (error) {
        next(error);
    }
}

// READ POSTS
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({});
        
        // remove isPublished property from response
        const postsData = posts.map((post) => {
            const { isPublished, ...rest } = post._doc;
            return rest;
        }).sort((a, b) => b.createdAt - a.createdAt);
        
        res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            total: posts.length,
            posts: postsData,
        });
    } catch (error) {
        next(error);
    }
}

// READ POST BY ID
const getPost = async (req, res, next) => {
    let {key, value} = req.body;
    if(!key) key = "_id";
    const keys = ["_id", "title", "writer", "createdAt"];
    if(!keys.includes(key)) {
        return res.status(400).json({
            success: false,
            message: "Invalid query key <[_id, title, writer, createdAt]>",
        });
    }
    try {
        const post = await Post.findOne({[key]: value});
        
        // throw error if post not found
        if (!post) {
            next(createError("Post not found", 404));
        }
        // remove isPublished property from response
        const { isPublished, ...rest } = post._doc;

        res.status(200).json({
            success: true,
            message: "Post retrieved successfully",
            post: rest,
        });
    } catch (error) {
        next(error);
    }
}




// modules export
export { createPost, getPost, getPosts };
