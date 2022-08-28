import { Router } from "express";
import { AUTHENTICATION, GETREFRESHTOKEN, LOGOUT } from "../controllers/auth.controllers.js";

const router = Router()

router.post("/", AUTHENTICATION)
router.get("/", LOGOUT)
router.get("/refresh", GETREFRESHTOKEN)

export default router;