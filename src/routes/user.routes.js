import { Router } from "express";

import schemaValidation from "../middlewares/schemaValidation.middleware.js";
import { signUpValidate, signInValidate } from "../schemas/userValidate.schema.js";
import { userSignUp, userSignIn } from "../middlewares/user.middleware.js";
import { signUp, signIn } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/signup", schemaValidation(signUpValidate), userSignUp, signUp);
userRouter.post("/signin", schemaValidation(signInValidate), userSignIn, signIn);

export default userRouter;