import { signInValidateDB, signUpValidateDB } from "../repositories/user.repository.js";
import bcrypt from "bcrypt";

export async function userSignUp(req, res, next) {
    try {
        const user = await signUpValidateDB(req.body);
        if (user.rowCount) return res.sendStatus(409);
        next();
    } catch (error) {
        res.send(500).send(error.message);
    }
}

export async function userSignIn(req, res, next) {
    const { password } = req.body;
    try {
        const checkUser = await signInValidateDB(req.body);
        if (!checkUser.rowCount) return res.sendStatus(401);

        const checkPassword = bcrypt.compareSync(password, checkUser.rows[0].password);
        if (!checkPassword) return res.status(401).send("Senha incorreta");

        res.locals.idUser = checkUser.rows[0].id;

        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
}