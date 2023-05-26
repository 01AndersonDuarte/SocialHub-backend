import { db } from "../database/database.connection.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export async function signUpDB(user) {
    const { name, userName, email, password } = user;
    const hash = bcrypt.hashSync(password, 10);

    await db.query(`
            INSERT INTO users (name, "userName", email, password)
            VALUES ($1, $2, $3, $4);`,
        [name, userName, email, hash]
    );

    return;
}

export async function signInDB(user) {
    const token = uuid();
    const { idUser } = user;

    await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [idUser, token]);

    return token;
}

export async function signUpValidateDB(user) {
    const { email } = user;
    const result = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);

    return result;
}

export async function signInValidateDB(user) {
    const { email } = user;
    const result = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);

    return result;
}