import { Router } from "express";

import multer from "multer";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { addPost, userPostsId } from "../controllers/posts.controller.js";
import schemaValidation from "../middlewares/schemaValidation.middleware.js";
import { postValidate } from "../schemas/postValidate.schema.js";

const postRouter = Router();
const upload = multer();

postRouter.post("/create-post", upload.single('photo'), schemaValidation(postValidate), authValidation, addPost);
postRouter.get("/get-user-posts/:id", userPostsId);

export default postRouter;