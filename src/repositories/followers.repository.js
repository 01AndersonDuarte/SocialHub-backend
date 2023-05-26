import { db } from "../database/database.connection.js";

export async function findUserDB(id) {
    const result = await db.query(`SELECT * FROM users WHERE id = $1;`, [id]);
    return result;
}

export async function followersRatioDB(id, userId) {
    const result = await db.query(`
        SELECT * FROM follow WHERE 
        "followerId" = $1 AND "followedId" = $2;`, [userId, id]);
    return result;
}

export async function followDB(signal, id, userId) {
    if (signal) {
        await db.query(`
            DELETE FROM follow WHERE "followerId" = $1 AND "followedId" = $2;`,
            [userId, id]
        );
        return;
    } else {
        await db.query(`
            INSERT INTO follow ("followerId", "followedId")
            VALUES ($1, $2);`, [userId, id]
        );
        return;
    }
}