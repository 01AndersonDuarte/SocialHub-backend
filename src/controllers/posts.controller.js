import * as postsService from "../services/posts.service.js";

export async function addPost(req, res) {
    const photoBuffer = req.file?.buffer;
    if (!photoBuffer) return res.sendStatus(401);

    const { description } = req.body;
    const { userId } = res.locals.session;

    await postsService.addPost(userId, photoBuffer, description);

    res.status(201).send("Sucesso!");
}