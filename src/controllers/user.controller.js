import { signInDB, signUpDB } from "../repositories/user.repository.js";

export async function signUp(req, res) {
    try {
        await signUpDB(req.body);
        res.status(201).send("Usuário cadastrado");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function signIn(req, res) {
    try {
        const token = await signInDB(res.locals);
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
}