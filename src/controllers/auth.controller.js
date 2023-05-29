import { signInDB, signUpDB } from "../repositories/auth.repository.js";

export async function signUp(req, res) {
    const photoBuffer = req.file?.buffer;
    if (!photoBuffer) return res.sendStatus(401);

    try {
        await signUpDB(req.body, photoBuffer);
        res.status(201).send("Usuário cadastrado");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function signIn(req, res) {
    try {
        const token = await signInDB(res.locals);
        res.status(200).send({ token, id: res.locals.idUser });
    } catch (error) {
        res.status(500).send(error.message);
    }
}