import CreateError from "../utils/Error";
import jwt from "jsonwebtoken";

export const verifyAccessToken = () => {
	let token;
	try{
			console.log(req.headers["authorization"]);
			token = req.headers.authorization?.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
				req.user = decoded;
				next()
        }catch(err)
        {
            next(err)
        }
	if (!token) {
		// CreateError("No token", 403);
        throw new Error("Unauthorized Access ")
	}
};
export const verifySuperAdmin = () => {
	let token;
	try{
			console.log(req.headers["authorization"]);
			token = req.headers.authorization?.split(" ")[1];
            const decoded = jwt.verify(
                token || "",
                process.env.JWT_SECRET || "")
                if(decoded.role !== 'admin')
                {
                    throw new Error("Unauthorized Access ")
                }
                req.user = decoded;
                next();
        }catch(err)
        {
            next(err)
        }
	if (!token) {
		// CreateError("No token", 403);
        throw new Error("Unauthorized Access ")
	}
};

// const token = req.cookies.access_token;
// console.log(token)

// if (!token) return next(CreateError("Admin not logged in", 401));
// jwt.verify(token, process.env.JWT_SECRET || "abracadabraaaaa!!!!...", (err:any, user:any) => {
//     if (err) return next(CreateError("Invalid token", 403));
//     req.user = user;
//     next();
// })

