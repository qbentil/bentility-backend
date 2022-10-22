import CreateError from "../utils/Error.js";
import jwt from "jsonwebtoken";

export const verifyAccessToken = (req, res, next) => {
  let token;
  try {
    // console.log("===>", req.headers["authorization"]);
    token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // check if token is valid
    if (!decoded) {
      return next(CreateError(401, "Invalid access token"));
    }
    // check if token is expired
    if (decoded.exp < Date.now() / 1000) {
      return next(CreateError("Token is expired", 401));
    }

    req.user = decoded;
    req.token = token;
    next();
  } catch (err) {
    return next(CreateError("Invalid access token", 401));
  }
  if (!token) {
    return next(CreateError("No access token", 401));
  }
};
export const verifySuperAdmin = (req, res, next) => {
  if (req.user && req.user.role !== "admin") {
    return next(CreateError("Unauthorized Access", 401));
  }
  next();
};

export const verifyResetToken = (req, res, next) => {
  let token;
  try {
    token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // check if token is valid
    if (!decoded) {
      return next(CreateError(401, "Invalid access token"));
    }
    // check if token is expired
    if (decoded.exp < Date.now() / 1000) {
      return next(CreateError("Token is expired", 401));
    }

    req.user = decoded;
    req.token = token;
    next();
  } catch (err) {
    return next(CreateError("Token has Expired. Request a new token", 401));
  }
  if (!token) {
    return next(CreateError("No reset token found", 401));
  }
};
