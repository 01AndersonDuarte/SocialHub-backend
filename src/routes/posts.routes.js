import { Router } from "express";

import multer from "multer";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { addPost, userPostsId } from "../controllers/posts.controller.js";
import schemaValidation from "../middlewares/schemaValidation.middleware.js";
import { postValidate } from "../schemas/postValidate.schema.js";

const postRouter = Router();
const upload = multer();

postRouter.use(authValidation);
postRouter.post("/create-post", upload.single('photo'), schemaValidation(postValidate), addPost);
// postRouter.get("/get-user-posts", userPostsId);

export default postRouter;