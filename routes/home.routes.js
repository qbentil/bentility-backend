import {
  HomeController,
  SENDMAIL,
  getUsers,
  PUBLIC_SENDMAIL,
  CONTACTMAIL,
} from "../controllers/home.controllers.js";

import express from "express";
import { restTokenRequest } from "../controllers/user.controllers.js";

// init express router
const router = express.Router();

router.get("/", HomeController);

// get users
router.get("/users", getUsers);

// SEND EMAIL
router.post("/email", SENDMAIL);

// REQUEST PASSWORD RESET TOKEN
router.post("/forgot-password", restTokenRequest);

// Public Utils
router.post("/public/sendmail", PUBLIC_SENDMAIL);

// CONTACT FORM
router.post("/contact", CONTACTMAIL);

// export router
export default router;
