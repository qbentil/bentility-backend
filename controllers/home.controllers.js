export const HomeController = (req, res, next) => {
    res.json({
      message: "Welcome to the Bentility Blog API",
      repository_url: "https://github.com/qbentil.com/bentility-api",
      base_url: "http://localhost:3000",
      endpoints: [
        {
          method: "GET",
          path: "/posts",
          description: "Get all posts",
        },
        {
          method: "POST",
          path: "/posts",
          description: "Create a new post",
        },
        {
          method: "GET",
          path: "/posts/:postId",
          description: "Get a post by id",
        },
        {
          method: "PUT",
          path: "/posts/:postId",
          description: "Update a post by id",
        },
        {
          method: "DELETE",
          path: "/posts/:postId",
          description: "Delete a post by id",
        },
      ],
      author: "Shadrack Bentil",
      author_url: "https://qbentil.com",
      
    });
  }