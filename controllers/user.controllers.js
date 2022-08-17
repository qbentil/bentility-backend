import GenerateToken from "../utils/Tokens.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

// ADD USER
export const addUser = async (req, res, next) => {
  const { username, email, password, name, role, about, phone, avatar } = req.body;
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
      },{ new: true });
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
        user: userData,
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
        users: usersData,
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE USER 
export const getUser = async (req, res, next) => {
    const {key, value} = req.body;
    console.log(req.body);
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
        user: userData,
        });
    } catch (error) {
        next(error);
    }
}

// USER AUTHENTICATION
export const userAuth = async (req, res, next) => {
    const { email, secret } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const isMatch = bcrypt.compareSync(secret, user.password);
        if(!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        // generate token
        const generatedToken = GenerateToken(user);
        
        // update token in user
        const updated_user = await User.findByIdAndUpdate(user._id, { token: generatedToken });
        
        // remove password and token
        const { password, ...userData } = updated_user._doc;
        res.status(200).json({
            success: true,
            message: "User authenticated successfully",
            user: userData,
        });
    } catch (error) {
        next(error);
    }
}