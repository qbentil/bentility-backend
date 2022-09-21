import User from "../models/user.js";
import bcrypt from "bcryptjs";

// DELETE USER
export const deleteUser = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await User.findByIdAndDelete(id);
    if(!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // remove password and token
    const {password, token, ...userData} = user._doc;
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
  const {key, value} = req.body;
  const keys = ["name", "role", "about"];
  if(key && !keys.includes(key)) {
    return res.status(400).json({
      success: false,
      message: "Invalid key",
    });
  }
  try {
    const users = key? await User.find({[key]: value}): await User.find();
    if(users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Users not found",
      });
    }
    // filter out password, is_deleted and is_super from admin data
    const usersData = users.map((user) => {
        const { password, token, ...userData } = user._doc;
        return userData;
    })
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
    const {key, value} = req.body;
    // console.log(req.body);
    const keys = ["username", "email", "phone"];
    if(!keys.includes(key)) {
        return res.status(400).json({
            success: false,
            message: "Invalid query key <[username, email, phone]>",
        });
    }
  try {
    const user = await User.findOne({[key]: value});
    if(!user) {
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
        const user = await User.findByIdAndUpdate(id,{ password: hash, }, { new: true });
        if(!user) {
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
}
