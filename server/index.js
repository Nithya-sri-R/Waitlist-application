import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import http from 'http';
import { Server as socketio } from 'socket.io';
import db from './config/mongoose.js';
import adminRoutes from './routes/admin.js';
import authRouter from './routes/auth.js';
import mainRouter from './routes/index.js';
import roomRouter from './routes/room.js';
import userRouter from './routes/user.js';

dotenv.config();
const PORT = process.env.PORT || 8000;

db().then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRoutes);
app.use('/api', mainRouter);
app.use('/api/room', roomRouter);

const server = http.createServer(app);
const io = new socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'withCredentials'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on('update-leaderboard', async () => {
    try {
      let scores = await Room.findOne({ name: 'LeaderBoard' }).populate({
        path: 'users',
        populate: { path: 'user', model: 'User' },
      });

      io.emit('updated-leaderboard', scores);
    } catch (error) {
      console.log('Error fetching scores:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
