import { addUser, changePassword, deleteUser, getUser, getUsers, updateUser, userAuth } from "../controllers/user.controllers.js";

import { Router } from "express";

const router = Router();
// ADD USER
router.post("/", addUser)

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

// LOGIN USER
router.post("/auth", userAuth)

export default router;
