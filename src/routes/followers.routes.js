import { Router } from "express";

import { authValidation } from "../middlewares/authValidation.middleware.js";
import { follow, follower, followersFollowing } from "../controllers/followers.controller.js";

const followersRouter = Router();

followersRouter.use(authValidation);
followersRouter.post("/following/:id", follow);
followersRouter.get("/follower/:id", follower);
followersRouter.get("/followers-following/:id", followersFollowing); // Dividir em duas rotas


export default followersRouter;