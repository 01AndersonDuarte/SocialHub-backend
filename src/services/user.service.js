import { findUserDB, userPostsIdDB, userProfileIdDB, usersProfilesDB } from "../repositories/users.repository.js";
import { userNotFoundError } from "../errors/userNotFound.js";

export async function findUserById(id){
    const findUser = await findUserDB(id);
    if (!findUser.rowCount) throw userNotFoundError();
}

export async function userProfileId(id) {
   
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
    return { profile: formatedProfile, posts: formatedPosts, id: id };
}

export async function usersProfiles(userId) {
    return await usersProfilesDB(userId);
}