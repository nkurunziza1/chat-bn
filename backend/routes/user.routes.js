import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import { getAllUser } from '../controllers/user.controllers.js';
const router = express.Router()

router.get('/',authMiddleware,getAllUser);

export default router