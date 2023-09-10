import { acessDeniedError } from "../errors/acessDenied.js";
import { findUsersProfilesDB, followDB, followersFollowingDB, UserConnectionDB } from "../repositories/followers.repository.js";
import { findUserById } from "./user.service.js";

async function checkUserConnection(id, userId){
    if (id === userId) throw new acessDeniedError();
    await findUserById(id);
    
    return await UserConnectionDB(id, userId);
}
export async function follow(id, userId) {    
    const follow = await checkUserConnection(id, userId);
    
    if (follow.rowCount) {
        await followDB(true, id, userId);
    } else {
        await followDB(false, id, userId);
    }
}

export async function follower(id, userId) {
    const follow = await checkUserConnection(id, userId);

    if (follow.rowCount) return true;
    return false;
}

export async function followersFollowing(id){
    await findUserById(id);    
    const result = await followersFollowingDB(id);
    const seguindo = [];
    const seguidores = [];
    
    result.rows.map(u=>{
        if(u.followedId != id){
            seguindo.push(u.followedId);
        }else{
            seguidores.push(u.followerId);
        }
    });

    const following = seguindo.length !==0 ? await findUsersProfilesDB(seguindo) : [];
    const followers = seguidores.length !==0 ? await findUsersProfilesDB(seguidores) : [];

    return {following, followers};
}