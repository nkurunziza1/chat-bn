import express from 'express'
import {getChat } from '../controllers/chat.controllers.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router()

router.get('/:id',authMiddleware,getChat);

export default router