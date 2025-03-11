import express from 'express'
import { getMessages, sendMessage } from '../controllers/message.controllers.js'
import authMiddleware from '../middlewares/auth.middleware.js'
const router = express.Router()


router.post('/send/:id',authMiddleware,sendMessage);
router.get('/get/:id',authMiddleware,getMessages);

export default router