ChatFlow Realtime API

A production-grade real-time chat backend system built with Node.js, Express, MongoDB, Socket.IO, and Redis-ready architecture, designed with clean architecture principles and scalable backend patterns.

This project demonstrates modern backend engineering practices, real-time communication, and secure system design.

🚀 Features
Authentication

User registration & login

Secure password hashing (bcrypt)

JWT authentication & protected routes

Real-Time Messaging

Real-time one-to-one chat

Group chats

Message delivery status (sent, delivered, read)

Typing indicators

Online/Offline presence (Redis-ready design)

Advanced Messaging

Media messages (image/file uploads)

Message search & pagination

End-to-End Encryption (E2EE) using Crypto-JS

Architecture

Feature-based folder structure

Controllers → Services → Models pattern

Centralized error handling

Logging system

Environment-based configuration

🧠 Tech Stack

Node.js / Express.js

MongoDB + Mongoose

Socket.IO

JWT (jsonwebtoken)

bcrypt

Multer (file uploads)

Crypto-JS (E2EE)

Redis (presence-ready architecture)

Winston Logger

dotenv, cors, uuid

📁 Project Structure
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── sockets/
├── utils/
├── app.js
└── index.js

⚙️ Environment Variables

Create .env:

PORT=8000
MONGODB_URL=mongodb://localhost:27017/chatflow
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d

# Optional Redis

REDIS_URL=redis://localhost:6379

▶️ Run Project
npm install
npm run dev
