import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app.js";
import connectDB from "./config/database.js";
import { initSocket } from "./sockets/socket.js";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    // Connecting to the database
    await connectDB();
    console.log("Database connected");

    // Creating the HTTP server
    const server = http.createServer(app);

    // Initializing WebSocket (or socket.io)
    initSocket(server);
    console.log("Socket initialized");

    //Start listening
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1); // Exit the process with failure
  }
};

// Only start the server if this file is run directly
startServer();
