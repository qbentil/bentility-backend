import Mail from "../mail/index.js";
import User from "../models/user.js";

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

export const SENDMAIL = async (req, res, next) => {
  try {
    const data = {
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
      
    }
    Mail.SendMail(data, (info)=> {
      res.status(200).json({
        success: true,
        message: "Email sent successfully",
        info
      })
    })
  }catch (error) {
    next(error);
  }
}

// get users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    // remove password, role, token, confirmed, createdAt, updatedAt, __v from users
    const usersWithoutSensitiveData = users.map((user) => {
      const { password, role, token, confirmed, createdAt, updatedAt, __v, ...data } = user._doc;
      return data;
    })
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data:usersWithoutSensitiveData
    })
  }catch (error) {
    next(error);
  }
}

export const CONTACTMAIL = async (req, res, next) => {
  try {
    const data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone || "Not provided",
      subject: req.body.subject,
      message: req.body.message,
      name: req.body.first_name + " " + req.body.last_name,
      htmlText: `
      ${process.env.EMAIL_NAME} CONTACT FORM
      
      <h1>Message from ${req.body.first_name} ${req.body.last_name}</h1>
      <p>Phone: ${req.body.phone || "Not provided"}</p>
      <p>Email: ${req.body.email}</p>
      <p>Subject: ${req.body.subject}</p>
      <p>Message: ${req.body.message}</p>
      
      <p>Secured by Bentility (MAILER) </p>
      
      Regards, <br>
      Bentility Team <br> <br>

      <small>Powered by Bentility API</small>
      
      `
    }
    Mail.CONTACTMAIL(data, (info)=> {
      res.status(200).json({
        success: true,
        message: "Email sent successfully",
        info
      })
    })
  }catch (error) {
    next(error);
  }
};

