import {
  addUser,
  changeAvatar,
  deleteUser,
  getUser,
  getUsers,
  resetPassword,
  updateUser,
} from "../controllers/admin.controllers.js";

import { Router } from "express";
import { verifySuperAdmin } from "../middlewares/Verifications.js";

const router = Router();

// ADD USER
router.post("/", verifySuperAdmin, addUser);
// UPDATE USER
router.put("/:id", verifySuperAdmin, updateUser);
// CHANGE AVATAR
router.patch("/:id", changeAvatar);

// DELETE USER
router.delete("/:id", verifySuperAdmin, deleteUser);

// GET USERS
router.get("/", getUsers);

// GET USER
router.get("/user", getUser);

// RESET PASSWORD
router.patch("/resetpassword/:id", resetPassword);

export default router;
