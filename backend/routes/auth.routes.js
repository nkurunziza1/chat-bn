import express from 'express';
import { login, logOut, signUp, testUser } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup',signUp);
router.post('/login',login);
router.post('/test',testUser);
router.post('/logout',logOut);



export default router