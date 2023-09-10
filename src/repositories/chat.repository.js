import { db } from "../database/database.connection.js";

export async function findChatByUsersIds(recipientId, senderId) {
    return await db.query(`SELECT * FROM chats 
    WHERE "senderId"=$1 AND "recipientId"=$2 
    OR "senderId"=$2 AND "recipientId"=$1;`,
        [senderId, recipientId]);
}

export async function createChat(recipientId, userId) {
    return await db.query(`INSERT INTO chats ("senderId", "recipientId") 
    VALUES ($1, $2) RETURNING *;`, [userId, recipientId]);
}

export async function insertMessage(chat, message) {
    console.log(chat.senderId)
    return await db.query(`INSERT INTO messages ("chatId", message, "senderId") 
    VALUES ($1, $2, $3);`, [chat.id, message, chat.senderId]);
}