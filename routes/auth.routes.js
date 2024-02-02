import { Router } from "express";
import {
  AUTHENTICATION,
  GETREFRESHTOKEN,
  LOGOUT,
} from "../controllers/auth.controllers.js";
import {
  confirmTokenUser,
  resetTokenRequest,
} from "../controllers/user.controllers.js";
import { verifyResetToken } from "../middlewares/Verifications.js";

const router = Router();

router.post("/", AUTHENTICATION);
router.get("/", LOGOUT);
router.get("/refresh", GETREFRESHTOKEN);
// REQUEST PASSWORD RESET TOKEN
router.post("/forgot-password", resetTokenRequest);

// VERIFY RESET PASSWORD TOKEN
router.get("/verify-token", verifyResetToken, confirmTokenUser);

export default router;
