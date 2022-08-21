import GenerateToken from "../utils/Tokens.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

// USER AUTHENTICATION
export const AUTHENTICATION = async (req, res, next) => {
    const { email, secret } = req.body;
    try {
        // Check for secret
        if(!secret){
            return res.status(400).json({
                success: false,
                message: "Please provide password <key=secret>"
            })

        }
        // Check for email
        if(!email){
            return res.status(400).json({
                success: false,
                message: "Please provide email"
            })
        }
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
        const {access_token, refresh_token} = GenerateToken(user);
        
        // update token in user
        await User.findByIdAndUpdate(user._id, { token: refresh_token });

        // add refresh token to cookie
        res.cookie("refresh_token", refresh_token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
        
        // remove password and token
        const { password, token, ...userData } = user._doc;
        
        userData.access_token = access_token; // add access token to user data
        res.status(200).json({
            success: true,
            message: "User authenticated successfully",
            user: userData,
        });
    } catch (error) {
        next(error);
    }
}