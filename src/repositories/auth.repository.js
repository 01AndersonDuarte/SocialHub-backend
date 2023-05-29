import { db } from "../database/database.connection.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export async function signUpDB(user, photoBuffer) {
    const { name, userName, biography, email, password } = user;
    const hash = bcrypt.hashSync(password, 10);

    const idCreated = await db.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3) RETURNING id;`,
        [name, email, hash]
    );
    await db.query(`
    INSERT INTO profile ("userId", "userName", picture, biography)
    VALUES ($1, $2, $3, $4);`, [idCreated.rows[0].id, `@${userName}`, photoBuffer, biography])

    return;
}

export async function signInDB(user) {
    const token = uuid();
    const { idUser } = user;

    await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [idUser, token]);

    return token;
}

export async function signUpValidateDB(user) {
    const { email, userName } = user;
    
    const resultEmail = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
    const resultUserName = await db.query(`SELECT * FROM profile WHERE "userName" = $1;`, [userName]);

    return (resultEmail.rowCount === 0 && resultUserName.rowCount === 0);
}

export async function signInValidateDB(user) {
    const { email } = user;
    const result = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);

    return result;
}