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
            // next(CreateError("Invalid access token", 401));
            // next(err)
            res.status(401).json({
                success: false,
                message: "Invalid access token",
                
            });
        }
	if (!token) {
		// next(CreateError("No access token", 401));
        // throw new Error("Unauthorized Access ")
        res.status(401).json({
            success: false,
            message: "No access token",
        })
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
                    // next(CreateError("Unauthorized Access", 401));
                    res.status(401).json({
                        success: false,
                        message: "Unauthorized Access",
                    });
                }
                req.user = decoded;
                next();
        }catch(err)
        {
            // next(err)
            // next(CreateError("Invalid access token", 401));
            res.status(401).json({
                success: false,
                message: "Invalid access token",
            })
        }
	if (!token) {
		// CreateError("No token", 403);
        // throw new Error("Unauthorized Access ")
        // next(CreateError("No access token", 401));
        res.status(401).json({
            success: false,
            message: "No access token",
        })
        
	}
};
