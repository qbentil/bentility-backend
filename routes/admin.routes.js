import { addUser, changePassword, deleteUser, getUser, getUsers, updateUser } from "../controllers/admin.controllers.js";

import { Router } from "express";
import { verifySuperAdmin } from "../middlewares/Verifications.js";

const router = Router();

// ADD USER
router.post("/", verifySuperAdmin , addUser)
// UPDATE USER
router.put("/:id", updateUser)

// DELETE USER
router.delete("/:id", deleteUser)

// GET USERS
router.get("/", getUsers)

// GET USER
router.get("/user", getUser)


// CHANGE PASSWORD
router.patch("/password/:id", changePassword)


export default router;
