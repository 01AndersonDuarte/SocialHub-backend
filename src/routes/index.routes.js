import { Router } from "express";

import userRouter from "./user.routes.js";
import postRouter from "./posts.routes.js";
import followersRouter from "./followers.routes.js";

const router = Router();

router.use(userRouter);
router.use(postRouter);
router.use(followersRouter);

export default router;