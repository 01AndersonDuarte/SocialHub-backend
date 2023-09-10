import * as chatRepository from "../repositories/chat.repository.js";
import { findUserById } from "./user.service.js";

export async function sendMessage(recipientId, userId, message){
    await findUserById(recipientId);

    let chat = await chatRepository.findChatByUsersIds(recipientId, userId);
    if(!chat.rowCount) chat = await chatRepository.createChat(recipientId, userId);

    return await chatRepository.insertMessage(chat.rows[0], message);
}