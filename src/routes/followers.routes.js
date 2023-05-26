import { Router } from "express";

import { authValidation } from "../middlewares/authValidation.middleware.js";
import { follow } from "../controllers/followers.controller.js";

const followersRouter = Router();

followersRouter.post("/following/:id", authValidation, follow);

export default followersRouter;