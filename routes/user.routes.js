import { addUser, changeAvatar, changePassword, deleteUser, getUser, updateUser } from "../controllers/user.controllers.js";

import { Router } from "express";
import { verifySuperAdmin } from "../middlewares/Verifications.js";

const router = Router();


// ADD USER
router.post("/", verifySuperAdmin , addUser)
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
