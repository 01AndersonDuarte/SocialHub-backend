import * as chatRepository from "../repositories/chat.repository.js";
import { findUserById } from "./user.service.js";

export async function sendMessage(recipientId, userId, message){
    await findUserById(recipientId);

    let chat = await chatRepository.findChatByUsersIds(recipientId, userId);
    if(!chat.rowCount) chat = await chatRepository.createChat(recipientId, userId);

    return await chatRepository.insertMessage(chat.rows[0], message);
}

export async function collectChats(userId){
    return await chatRepository.collectChats(userId);
}

export async function collectMessagesByChat(chatId, userId){
    const messages = await chatRepository.collectMessagesByChat(chatId, userId);
    return messages.rows.reverse();
}

// function formatMessages(messages, userId){
//     const formattedMessages = [];

//     messages.forEach(m => {
//         if(m.senderId===userId) formatMessages.push({message: m.message, });
//     });
// }