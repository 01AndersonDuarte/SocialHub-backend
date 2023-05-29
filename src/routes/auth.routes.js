import { Router } from "express";

import schemaValidation from "../middlewares/schemaValidation.middleware.js";
import { signUpValidate, signInValidate } from "../schemas/userValidate.schema.js";
import { userSignUp, userSignIn } from "../middlewares/auth.middleware.js";
import { signUp, signIn } from "../controllers/auth.controller.js";
import multer from "multer";

const authRouter = Router();
const upload = multer();

authRouter.post("/signup", upload.single('photo'), schemaValidation(signUpValidate), userSignUp, signUp);
authRouter.post("/signin", schemaValidation(signInValidate), userSignIn, signIn);


export default authRouter;