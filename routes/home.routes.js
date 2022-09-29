import { HomeController, TestEmail } from '../controllers/home.controllers.js';

import express from 'express';

// init express router
const router = express.Router();

router.get('/', HomeController);

// SEND EMAIL
router.post("/email", TestEmail)
  
// export router
export default router;