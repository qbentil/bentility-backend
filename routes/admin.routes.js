import { addUser, changePassword, deleteUser, getUser, getUsers, updateUser } from "../controllers/admin.controllers.js";

import { Router } from "express";

const router = Router();

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
