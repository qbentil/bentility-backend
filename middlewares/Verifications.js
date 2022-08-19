import CreateError from "../utils/Error.js";
import jwt from "jsonwebtoken";

export const verifyAccessToken = (req, res, next) => {
	let token;
	try{
			console.log("===>", req.headers["authorization"]);
			token = req.headers.authorization?.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
				req.user = decoded;
				next()
        }catch(err)
        {
            next(CreateError("Invalid access token", 401));
            // next(err)
        }
	if (!token) {
		next(CreateError("No access token", 401));
        // throw new Error("Unauthorized Access ")
	}
};
export const verifySuperAdmin = (req, res, next) => {
	let token;
	try{
			console.log(req.headers["authorization"]);
			token = req.headers.authorization?.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
                if(decoded.role !== 'admin')
                {
                    // throw new Error("Unauthorized Access ")
                    next(CreateError("Unauthorized Access", 401));
                }
                req.user = decoded;
                next();
        }catch(err)
        {
            // next(err)
            next(CreateError("Invalid access token", 401));
        }
	if (!token) {
		// CreateError("No token", 403);
        // throw new Error("Unauthorized Access ")
        next(CreateError("No access token", 401));
        
	}
};
