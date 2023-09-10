import { db } from "../database/database.connection.js";

export async function addPostDB(userId, photoBuffer, description) {
    await db.query(`INSERT INTO posts ("userId", photo, description) VALUES ($1, $2, $3);`, [userId, photoBuffer, description]);
    return;
}