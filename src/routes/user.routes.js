import { Router } from "express";

import { authValidation } from "../middlewares/authValidation.middleware.js";
import { userProfileId, usersProfiles } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.use(authValidation);

userRouter.get("/get-users-profiles", usersProfiles);
userRouter.get("/get-user-profile/:id", userProfileId);

export default userRouter;