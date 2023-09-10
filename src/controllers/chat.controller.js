import * as chatService from "../services/chat.service.js";

export async function sendMessage(req, res) {
    const { recipientId } = req.params;
    const { message } = req.body;
    const { userId } = res.locals.session;

    if (isNaN(recipientId)) return res.status(401).send("Valor inválido");
    if (parseInt(recipientId) === userId) return res.sendStatus(401);

    await chatService.sendMessage(recipientId, userId, message);
    res.sendStatus(201);
};