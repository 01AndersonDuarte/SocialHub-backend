import * as userService from "../services/user.service.js";

export async function userProfileId(req, res) {
    let { id } = req.params;
    if (!id) id = res.locals.session.userId;

    const response = await userService.userProfileId(id);
    res.send(response);
}

export async function usersProfiles(req, res) {
    const { userId } = res.locals.session;

    const objectHeader = await userService.usersProfiles(userId);
    res.send(objectHeader);
}