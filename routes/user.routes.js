import {  changeAvatar, changePassword, deleteUser, getUser, updateUser } from "../controllers/user.controllers.js";

import { Router } from "express";

const router = Router();


// UPDATE USER
router.put("/", updateUser)

// DELETE USER
router.delete("/:id", deleteUser)


// GET USER
router.get("/", getUser)


// CHANGE PASSWORD
router.patch("/password", changePassword)

// CHANGE AVATAR
router.patch("/", changeAvatar)
    

export default router;
