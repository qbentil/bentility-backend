import { addUser, changePassword, deleteUser, getUser, getUsers, updateUser } from "../controllers/user.controllers.js";

import { Router } from "express";

const router = Router();
// ADD USER
router.post("/", addUser)

// UPDATE USER
router.put("/", updateUser)

// DELETE USER
router.delete("/:id", deleteUser)

// GET USERS
router.get("/", getUsers)

// GET USER
router.get("/user", getUser)


// CHANGE PASSWORD
router.patch("/", changePassword)


export default router;
