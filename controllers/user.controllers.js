import User from "../models/user.js";
import bcrypt from "bcryptjs";
import Mail from "../mail/index.js";
import GenerateToken from "../utils/Tokens.js";

// UPDATE USER
export const updateUser = async (req, res, next) => {
  const { id } = req.user;
  const { name, about, phone } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        about,
        phone,
      },
      { new: true }
    );
    // remove password and token
    const { password, token, ...userData } = user._doc;
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE USER
export const deleteUser = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // remove password and token
    const { password, token, ...userData } = user._doc;
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

// GET USERS
export const getUsers = async (req, res, next) => {
  const { key, value } = req.body;
  const keys = ["name", "role", "about"];
  if (key && !keys.includes(key)) {
    return res.status(400).json({
      success: false,
      message: "Invalid key",
    });
  }
  try {
    const users = key ? await User.find({ [key]: value }) : await User.find();
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Users not found",
      });
    }
    // filter out password, is_deleted and is_super from admin data
    const usersData = users.map((user) => {
      const { password, token, ...userData } = user._doc;
      return userData;
    });
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      total: users.length,
      data: usersData,
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE USER
export const getUser = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await User.findOne({ id });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // remove password and token
    const { password, token, ...userData } = user._doc;
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

// CHANGE PASSWORD
export const changePassword = async (req, res, next) => {
  const { id } = req.user;
  const { password, new_password } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid current password",
      });
    }
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(new_password, salt);
    await User.findByIdAndUpdate(id, { password: hash, confirmed: true });
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

// CHANGE AVATAR
export const changeAvatar = async (req, res, next) => {
  const { id } = req.user;
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { avatar });
    res.status(200).json({
      success: true,
      message: "Avatar changed successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// REQUEST REST TOKEN
export const resetTokenRequest = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const { reset_token } = GenerateToken(user);
    await User.findByIdAndUpdate(user._id, { reset_token });
    // send email
    const mailOptions = {
      subject: "Reset Password",
      email,
      message: `
        <p>Hello ${user.name}, </p>

        <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
        <p>Please click on this following <a href='${process.env.SITE_URL}/verify-token/${reset_token}' >link</a>, or paste the link below into your browser to complete the process: </p>
        <i>${process.env.SITE_URL}/verify-token/${reset_token} </i> <br />

        <p><b>Note:</b> This link will expire in 1 hour. </p>

        <p>If you did not request this, please ignore this email and your password will remain unchanged. </p>

        Thank you. <br /> <br />
        Regards, <br />
        ${process.env.EMAIL_NAME}, <br />
        Support Team👨‍💻
      `,
    };
    Mail.SendMail(mailOptions, (info) => {
      res.status(200).json({
        success: true,
        message: "Token sent to email",

      });
    });
  } catch (error) {
    next(error);
  }
};

// VERIFY RESET TOKEN
export const confirmTokenUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ reset_token: req.token });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user._id.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    res.status(200).json({
      success: true,
      message: "Token verified successfully",
    });
  } catch (error) {
    next(error);
  }
};
