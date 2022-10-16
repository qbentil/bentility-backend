import { HomeController, SENDMAIL, getUsers, PUBLIC_SENDMAIL } from '../controllers/home.controllers.js';

import express from 'express';

// init express router
const router = express.Router();

router.get('/', HomeController);

// get users
router.get("/users", getUsers)

// SEND EMAIL
router.post("/email", SENDMAIL)

// Public Utils
router.post("/public/sendmail", PUBLIC_SENDMAIL)
  
// export router
export default router;