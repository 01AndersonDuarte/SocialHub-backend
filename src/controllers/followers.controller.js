import { findUserDB, findUsersProfilesDB, followDB, followersFollowingDB, followersRatioDB } from "../repositories/followers.repository.js";

export async function follow(req, res) {
    const { id } = req.params;
    const { userId } = res.locals.session;
    if (id === userId) return res.status(403).send("Operação não permitida.");
    console.log('aqui');

    try {
        const userFollowed = await findUserDB(id);
        if (!userFollowed.rowCount) return res.status(404).send("Usuário não encontrado.");

        const follow = await followersRatioDB(id, userId);

        if (follow.rowCount) {
            await followDB(true, id, userId);
            return res.send("Deixou de seguir");
        } else {
            await followDB(false, id, userId);
            res.send("Seguindo.");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function follower(req, res) {
    const { id } = req.params;
    const { userId } = res.locals.session;
    if (id === userId) return res.status(403).send("Operação não permitida.");

    try {
        const userFollowed = await findUserDB(id);
        if (!userFollowed.rowCount) return res.status(404).send("Usuário não encontrado.");

        const follow = await followersRatioDB(id, userId);

        if (follow.rowCount) {
            return res.send(true);
        } else {
            res.send(false);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }

}

export async function followersFollowing(req, res){
    const { id } = req.params;

    try {
        const userFollowed = await findUserDB(id);
        if (!userFollowed.rowCount) return res.status(404).send("Usuário não encontrado.");

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

        res.send({following, followers})
    } catch (error) {
        res.status(500).send(error.message);
    }
}