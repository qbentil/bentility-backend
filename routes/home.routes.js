import { HomeController } from '../controllers/home.controllers.js';
import express from 'express';

// init express router
const router = express.Router();

router.get('/', HomeController);
  
// export router
export default router;