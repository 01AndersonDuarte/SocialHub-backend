import * as followersService from "../services/followers.service.js";

export async function follow(req, res) {
    const { id } = req.params;
    const { userId } = res.locals.session;
    await followersService.follow(id, userId);
 
    res.send("Sucess");
}

export async function follower(req, res) {
    const { id } = req.params;
    const { userId } = res.locals.session;
    const response = await followersService.follower(id, userId);

    res.send(response);
}

export async function followersFollowing(req, res){
    const { id } = req.params;
    const response = await followersService.followersFollowing(id);
    
    res.send(response)
}