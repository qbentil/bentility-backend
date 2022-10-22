import jwt from "jsonwebtoken";

const GenerateToken = (user) => {
    //   Create access token
    const access_token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || "",
        {
            expiresIn: '1d' // 1 day
        }
    );
    //   Create refresh token
    const refresh_token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_REFRESH_SECRET || "",
        {
            expiresIn: '30d' // 30 days
        }
    );

    //  Create reset token
    const reset_token = jwt.sign(
        { id: user._id, role: user.role, email: user.email },
        process.env.JWT_SECRET || "",
        {
            expiresIn: '1h' // 1 hour
        }
    );

    return { access_token, refresh_token, reset_token };
}

export default GenerateToken

