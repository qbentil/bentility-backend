import User from "../models/user.js";

// ADD USER
export const addUser = async (req, res, next) => {
    const { username, email, password, name, role, about, phone, avatar } = req.body;
    try {
        const user = new User({
            username,
            email,
            password,
            name,
            role,
            about,
            phone,
            avatar
        });
        await user.save();
        res.status(201).json({
            success: true,
            message: "User added successfully",
            user
        });
    } catch (error) {
        next(error);
    }
}

// UPDATE USER
export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { username, email, password, name, role, about, phone, avatar } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, {
            username,
            email,
            password,
            name,
            role,
            about,
            phone,
            avatar
        });
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user
        });
    } catch (error) {
        next(error);
    }
}

// DELETE USER
export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            user
        });
    } catch (error) {
        next(error);
    }
}

// GET USERS
export const getUsers = async (req, res, next) => {
    try{
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            users
        });
    }catch(error)
    {
        next(error)
    }
}