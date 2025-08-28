import express from "express";
import mongoose from "mongoose";
import configDB from "./config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import tokenMiddleware from "./src/middlewares/tokenMiddleware.js";
import { setupWebSocket } from "./src/websocket/notificationServer.js"; // importado

import authRoutes from "./src/routes/authenticationRoutes.js";
import clubRoutes from "./src/routes/clubRoutes.js";
import clubHistoryRoutes from "./src/routes/clubHistoryRoutes.js";
import requestRoutes from "./src/routes/requestRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import testRoutes from "./src/routes/testRoutes.js";

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
}));

app.use(cookieParser());
app.use(express.json());

mongoose.connect(configDB.DB_URI)
    .then(() => console.log('Connected to MongoDB database'))
    .catch((err) => console.error('Error connecting to MongoDB', err));

// Inicializa o servidor HTTP
const server = app.listen(configDB.PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${configDB.PORT}`);
});

// Inicializa o WebSocket
setupWebSocket(server);

// Configurar as rotas do Express
app.use('/api/auth', authRoutes);
app.use('/', testRoutes);
app.use(tokenMiddleware);
app.use('/api/club', clubRoutes);
app.use('/api/clubHistory', clubHistoryRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/user', userRoutes);
