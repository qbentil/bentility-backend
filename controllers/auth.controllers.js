import GenerateToken from "../utils/Tokens.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

// USER AUTHENTICATION
export const AUTHENTICATION = async (req, res, next) => {
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
        const tokens = GenerateToken(user);
        
        // update token in user
        const updated_user = await User.findByIdAndUpdate(user._id, { token: tokens.refresh_token }, { new: true });
        
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