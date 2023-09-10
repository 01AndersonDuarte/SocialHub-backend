import 'express-async-errors';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import router from "./routes/index.routes.js";
import errorHandlingMiddleware from './middlewares/error.middleware.js';

const server = express();

server.use(cors());
server.use(express.json());
server.use(router);
server.use(errorHandlingMiddleware);
dotenv.config();


const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>console.log(`Server connected on port ${PORT}`));