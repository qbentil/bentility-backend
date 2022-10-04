import Mail from "../mail/index.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import createError from "../utils/Error.js";

// ADD USER
export const addUser = async (req, res, next) => {
  const { username, email, name, role, about, phone, avatar } = req.body;
  // generate random 8 digit password
  const password = Math.floor(10000000 + Math.random() * 90000000).toString();
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  try {
    const user = new User({
      username,
      email,
      password: hash,
      name,
      role,
      about,
      phone,
      avatar,
    });
    await user.save();
    // send welcome email
    const data = {
      name,
      email,
      password,
      username,
      role,
    };
    Mail.OnboardingMail(data, (info) => {
      // remove password and token
      const { password, token, ...userData } = user._doc;
      res.status(201).json({
        success: true,
        message: "User added successfully",
        data: userData,
      });
    });
  } catch (error) {
    next(error);
  }
};
// UPDATE USER
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  // const { name, about, phone } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
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
  const { key, value } = req.query;
  const keys = ["username", "role", "about"];
  if (key && !keys.includes(key)) {
    return res.status(400).json({
      success: false,
      message: "Invalid key",
    });
  }
  if (key && !value) {
    return next(createError("Invalid query value", 400));
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
  const { key, value } = req.body;
  // console.log(req.body);
  const keys = ["username", "email", "phone"];
  if (!keys.includes(key)) {
    return res.status(400).json({
      success: false,
      message: "Invalid query key <[username, email, phone]>",
    });
  }
  try {
    const user = await User.findOne({ [key]: value });
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
  const { password } = req.body;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { password: hash },
      { new: true }
    );
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
      message: "Password changed successfully",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { password: hash, confirmed: false },
      { new: true }
    );
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
      message: "Password reset successfully",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

// CHANGE AVATAR
export const changeAvatar = async (req, res, next) => {
  const { id } = req.params;
  const { avatar } = req.body;
  try {
      const user = await User.findByIdAndUpdate(id, {avatar});
      res.status(200).json({
          success: true,
          message: "Avatar changed successfully",
          data: user,
      });
      
  } catch (error) {
      next(error);
  }
}