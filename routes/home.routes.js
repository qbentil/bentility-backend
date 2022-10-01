import { HomeController, SENDMAIL, getUsers } from '../controllers/home.controllers.js';

import express from 'express';

// init express router
const router = express.Router();

router.get('/', HomeController);

// get users
router.get("/users", getUsers)

// SEND EMAIL
router.post("/email", SENDMAIL)
  
// export router
export default router;