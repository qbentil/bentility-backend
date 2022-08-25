import { Router } from "express";
import { AUTHENTICATION, LOGOUT } from "../controllers/auth.controllers.js";

const router = Router()

router.post("/", AUTHENTICATION)
router.get("/", LOGOUT)

export default router;