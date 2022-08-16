import User from "../models/user.js";
import bcrypt from "bcryptjs";

// ADD USER
export const addUser = async (req, res, next) => {
  const { username, email, password, name, role, about, phone, avatar } =
    req.body;
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

    // remove password and token
    const { password, token, ...userData } = user._doc;
    res.status(201).json({
      success: true,
      message: "User added successfully",
      user: userData,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE USER
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, role, about, phone, avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        role,
        about,
        phone,
        avatar,
      },
      { new: true }
    );
    // remove password and token
    const { password, token, ...userData } = user._doc;
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: userData,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE USER
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    // remove password and token
    const {password, token, ...userData} = user._doc;
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user: userData,
    });
  } catch (error) {
    next(error);
  }
};

// GET USERS
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    // filter out password, is_deleted and is_super from admin data
    const usersData = users.map((user) => {
        const { password, token, ...userData } = user._doc;
        return userData;
    })
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users: usersData,
    });
  } catch (error) {
    next(error);
  }
};

// GET USER BY ID
export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    // remove password and token
    const {password, token, ...userData} = user._doc;
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      user: userData,
    });
  } catch (error) {
    next(error);
  }
};

// GET USER BY EMAIL
export const getUserByEmail = async (req, res, next) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    // remove password and token
    const {password, token, ...userData} = user._doc;
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      user: userData,
    });
  } catch (error) {
    next(error);
  }
};

// CHANGE PASSWORD
export const changePassword = async (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    try {
        const user = await User.findByIdAndUpdate(
        id,
        {
            password: hash,
        },
        { new: true }
        );
        // remove password and token
        const { password, token, ...userData } = user._doc;
        res.status(200).json({
        success: true,
        message: "Password changed successfully",
        user: userData,
        });
    } catch (error) {
        next(error);
    }
}