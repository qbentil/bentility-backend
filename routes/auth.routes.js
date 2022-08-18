import { Router } from "express";
import { AUTHENTICATION } from "../controllers/auth.controllers.js";

const router = Router()

router.post("/", AUTHENTICATION)

export default router;