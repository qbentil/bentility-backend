import { addUser, deleteUser, getUsers, updateUser } from "../controllers/user.controller.js";

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

// GET USER BY ID
router.get("/:id", (req, res) => {})

// GET USER BY EMAIL
router.get("/email/:email", (req, res) => {})

// GET USER BY USERNAME
router.get("/username/:username", (req, res) => {})

// GET USER BY ROLE
router.get("/role/:role", (req, res) => {})

// LOGIN USER
router.post("/auth", (req, res) => {})

export default router;
