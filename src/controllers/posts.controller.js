import { addPostDB, userPostsIdDB } from "../repositories/posts.repository.js";

export async function addPost(req, res) {
    const photoBuffer = req.file?.buffer;
    if (!photoBuffer) return res.sendStatus(401);

    const { description } = req.body;
    const { userId } = res.locals.session;

    await addPostDB(userId, photoBuffer, description);

    res.status(201).send("Sucesso!");
    // const imageUser = await db.query(`SELECT photo FROM posts WHERE "userId"=$1 OFFSET 3 LIMIT 1;`, [userId]);
    // const base64Image = `data:image/jpeg;base64,${imageUser.rows[0].photo.toString('base64')}`;

    // res.send({ image: base64Image, description: description });

}

export async function userPostsId(req, res) {
    const { id } = req.params;

    const userPosts = await userPostsIdDB(id);
    const formatedUserPosts = userPosts.rows.map(u=>{
        return {image: `data:image/jpeg;base64,${u.photo.toString('base64')}`,
                description: u.description};
    });

    res.send(formatedUserPosts);
}