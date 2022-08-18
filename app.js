import { AuthRoute, CategoryRoute, HomeRoute, UserRoute } from "./routes/index.routes.js";
import { verifyAccessToken } from './middlewares/Verifications.js';
import DBCONNECT from "./config/dbconnection.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import errorHandler from "./middlewares/ErrorHandler.js";
import express from "express";

// init dotenv
dotenv.config();

// init app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// HOME ROUTE
app.use("/", HomeRoute);
app.use("/users", UserRoute);
app.use("/categories",verifyAccessToken, CategoryRoute);
app.use("/auth", AuthRoute);

// MIDDLEWARE
app.use(errorHandler)

// run server
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  await DBCONNECT();
  console.log(`Server running on port ${port} 🚀`);
});
