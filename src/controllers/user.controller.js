import { findUserDB } from "../repositories/followers.repository.js";
import { userPostsIdDB, userProfileIdDB, usersProfilesDB } from "../repositories/posts.repository.js";

export async function userProfileId(req, res) {
    let { id } = req.params;
    if (!id) id = res.locals.session.userId;

    const findUser = await findUserDB(id);
    if (!findUser.rowCount) return res.status(404).send("Página não encontrada");

    const userPosts = await userPostsIdDB(id);
    const formatedPosts = userPosts.rows.map(u => {
        return {
            image: `data:image/jpeg;base64,${u.photo.toString('base64')}`,
            description: u.description,
            date: u.createdAt
        };
    });

    const userProfile = await userProfileIdDB(id);
    const { picture, ...dataUser } = userProfile.rows[0];
    const formatedProfile = {
        userPicture: `data:image/jpeg;base64,${userProfile.rows[0].picture.toString('base64')}`,
        userProfile: dataUser
    };
    res.send({ profile: formatedProfile, posts: formatedPosts, id: id });

}

export async function usersProfiles(req, res) {
    const { userId } = res.locals.session;

    const objectHeader = await usersProfilesDB(userId);
    res.send(objectHeader);
}