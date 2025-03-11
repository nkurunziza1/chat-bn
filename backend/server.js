import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import chatRoutes from './routes/chat.routes.js';
import connectToMongoDb from './db/connectToMongoDb.js';
import cookieParser from 'cookie-parser';
import { app, server } from './soket.io/soket.js';

dotenv.config();
const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/user', userRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.send('Hello Node js');
});

server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server is running on port ${PORT}`);
});
