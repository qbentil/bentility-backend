import Mail from "../mail/index.js";
import User from "../models/user.js";

export const HomeController = (req, res, next) => {
  res.json({
    message: "Welcome to the Bentility Blog API",
    repository_url: "Sorry this is a private repository",
    base_url: "https://bentility-api.herokuapp.com",
    public_endpoints: [
      {
        method: "POST",
        path: "/public/sendmail",
        description: "Send email to anyone with our public mailer",
        body: {
          receiver_email: "string" || "required",
          subject: "String" || "required",
          message: "String" || "required",
          sender_name: "String" || "optional",
          sender_email: "String" || "optional",
        },
      },
    ],
    author: "Shadrack Bentil",
    author_url: "https://qbentil.com",
  });
};

export const SENDMAIL = async (req, res, next) => {
  try {
    const data = {
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    };
    Mail.SendMail(data, (info) => {
      res.status(200).json({
        success: true,
        message: "Email sent successfully",
        info,
      });
    });
  } catch (error) {
    next(error);
  }
};

// PUBLIC SEND MAIL
export const PUBLIC_SENDMAIL = async (req, res, next) => {
  const {
    receiver_email,
    subject,
    message,
    sender_name,
    sender_email,
  } = req.body;

  // make sure all required fields are provided
  if (!receiver_email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: `Please provide all required fields
      receiver_email, subject, message.

      HINT1: Make sure you are sending a POST request with the required fields in the body.
      HINT2: Make sure field names are correct.
      HINT3: sender_name and sender_email are optional
      `,
    });
  }
  try {
    const data = {
      email: receiver_email,
      subject: subject,
      sender_name: sender_name || "Bentility Public Mailer",
      sender_email: sender_email || "NO-REPLY",
      message: `
        <p>${message}</p>

        <p>Regards,</p>
        <p>${sender_name}</p>
        <p>${sender_email || ''}</p>


        <small><i>This mailer is powered by <a href="https://bentility-api.herokuapp.com">Bentility API</a></i></small> <br />
        <small>Made with ❤ by <i>
        <a href="https://qbentil.com">Shadrack Bentil</a></i></small>
      `,
    };
    Mail.publicMailer(data, (info) => {
      res.status(200).json({
        success: true,
        message: "Email sent successfully",
        mail_id: info.messageId,
      });
    });
  } catch (error) {
    next(error);
  }
};

// get users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    // remove password, role, token, confirmed, createdAt, updatedAt, __v from users
    const usersWithoutSensitiveData = users.map((user) => {
      const {
        password,
        role,
        token,
        confirmed,
        createdAt,
        updatedAt,
        __v,
        ...data
      } = user._doc;
      return data;
    });
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: usersWithoutSensitiveData,
    });
  } catch (error) {
    next(error);
  }
};
