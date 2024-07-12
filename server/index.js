import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import http from 'http';
import { Server as socketio } from 'socket.io';
import db from './config/mongoose.js';
import Room from './model/Room.js';
import adminRoutes from './routes/admin.js';
import authRouter from './routes/auth.js';
import mainRouter from './routes/index.js';
import roomRouter from './routes/room.js';
import userRouter from './routes/user.js';

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 8000;

db().then(() => {
  console.log('MongoDB connected'); // Confirm MongoDB connection
}).catch((error) => {
  console.error('MongoDB connection error:', error); // Handle MongoDB connection error
});

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Allow only this origin for CORS
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true, // Allow credentials
}));

app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat', // Session secret
  resave: false, // Do not save session if unmodified
  saveUninitialized: false, // Do not create session until something stored
}));

// Route handling
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRoutes);
app.use('/api', mainRouter);
app.use('/api/room', roomRouter);

const server = http.createServer(app);
const io = new socketio(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow only this origin for CORS
    methods: ['GET', 'POST'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'withCredentials'], // Allow these headers
    credentials: true, // Allow credentials
  },
});

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`); // Log socket connection

  socket.on('update-leaderboard', async () => {
    try {
      let scores = await Room.findOne({ name: 'LeaderBoard' }).populate({
        path: 'users',
        populate: { path: 'user', model: 'User' },
      });

      io.emit('updated-leaderboard', scores); // Emit updated leaderboard
    } catch (error) {
      console.log('Error fetching scores:', error); // Handle error
    }
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`); // Log socket disconnection
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Confirm server is running
});
