import jwt from "jsonwebtoken";

const GenerateToken = (user) => {
    //   Create access token
    const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || "",
        {
            expiresIn: '1d'
        }
    );
    //   Create refresh token
    const refreshToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_REFRESH_SECRET || "",
        {
            expiresIn: '30d'
        }
    );

    return { accessToken, refreshToken }
}

export default GenerateToken

