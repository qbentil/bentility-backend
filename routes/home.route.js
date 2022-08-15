import express from 'express';

// init express router
const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({
      message: "Welcome to the Bentility Blog API",
      repository_url: "https://github.com/qbentil.com/bentility-api",
      base_url: "http://localhost:3000",
      endpoints: [
        {
          method: "GET",
          path: "/api/v1/posts",
          description: "Get all posts",
        },
        {
          method: "POST",
          path: "/api/v1/posts",
          description: "Create a new post",
        },
        {
          method: "GET",
          path: "/api/v1/posts/:postId",
          description: "Get a post by id",
        },
        {
          method: "PUT",
          path: "/api/v1/posts/:postId",
          description: "Update a post by id",
        },
        {
          method: "DELETE",
          path: "/api/v1/posts/:postId",
          description: "Delete a post by id",
        },
      ],
      author: "Shadrack Bentil",
      author_url: "https://qbentil.com",
      
    });
  });
  
// export router
export default router;