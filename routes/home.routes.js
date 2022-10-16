import { CONTACTMAIL, HomeController, SENDMAIL, getUsers } from '../controllers/home.controllers.js';

import express from 'express';

// init express router
const router = express.Router();

router.get('/', HomeController);

// get users
router.get("/users", getUsers)

// SEND EMAIL
router.post("/email", SENDMAIL)

// CONTACT FORM
router.post("/contact", CONTACTMAIL)
  
// export router
export default router;