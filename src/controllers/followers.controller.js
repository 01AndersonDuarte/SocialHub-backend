import { findUserDB, followDB, followersRatioDB } from "../repositories/followers.repository.js";

export async function follow(req, res) {
    const { id } = req.params;
    const { userId } = res.locals.session;
    try {
        const userFollowed = await findUserDB(id);
        if(!userFollowed.rowCount) return res.status(404).send("Usuário não encontrado.");

        const follow = await followersRatioDB(id, userId);
        
        if(follow.rowCount){
            await followDB(true, id, userId);
            return res.send("Deixou de seguir");
        }else{
            await followDB(false, id, userId);
            res.send("Seguindo.");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}