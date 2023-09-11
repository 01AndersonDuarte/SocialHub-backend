import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import schemaValidation from "../middlewares/schemaValidation.middleware.js";
import { messageValidate } from "../schemas/chatValidate.schema.js";
import { collectChats, collectMessagesByChat, sendMessage } from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.use(authValidation);

chatRouter.post("/post-message/:recipientId", schemaValidation(messageValidate), sendMessage);
// chatRouter.post("/post-message-chat/:chatId", userProfileId);
chatRouter.get("/get-chats", collectChats);
chatRouter.get("/get-messages/:chatId", collectMessagesByChat);

export default chatRouter;