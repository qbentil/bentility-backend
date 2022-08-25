import { AuthRoute, CategoryRoute, HomeRoute, PostRoute, UserRoute } from "./routes/index.routes.js";

import DBCONNECT from "./config/dbconnection.js";
import dotenv from "dotenv";
import errorHandler from "./middlewares/ErrorHandler.js";
import express from "express";
import { verifyAccessToken } from './middlewares/Verifications.js';
import cookieParser from "cookie-parser";

// init dotenv
dotenv.config();

// init app
const app = express();
app.use(cookieParser());
app.use(express.json());

// MIDDLEWARES
app.use("/", HomeRoute);
app.use("/user", verifyAccessToken, UserRoute);
app.use("/categories", CategoryRoute);
app.use("/posts", PostRoute)
app.use("/auth", AuthRoute);

// ERROR HANDLER MIDDLEWARE
app.use(errorHandler)

// run server
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  await DBCONNECT();
  console.log(`Server running on port ${port} 🚀`);
});
