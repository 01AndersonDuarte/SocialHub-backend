import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import schemaValidation from "../middlewares/schemaValidation.middleware.js";
import { messageValidate } from "../schemas/chatValidate.schema.js";
import { sendMessage } from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.use(authValidation);

chatRouter.post("/post-message/:recipientId", schemaValidation(messageValidate), sendMessage);
// chatRouter.post("/post-message-chat/:chatId", userProfileId);
// chatRouter.get("/get-chats/:userId", usersProfiles);
// chatRouter.get("/get-messages/:chatId", userProfileId);

export default chatRouter;