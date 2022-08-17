import jwt from "jsonwebtoken";

const GenerateToken = (user) => {
    //   Create access token
    const access_token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || "",
        {
            expiresIn: '1d'
        }
    );
    //   Create refresh token
    const refresh_token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_REFRESH_SECRET || "",
        {
            expiresIn: '30d'
        }
    );

    return { access_token, refresh_token }
}

export default GenerateToken

