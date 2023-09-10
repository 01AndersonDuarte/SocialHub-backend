import joi from "joi";

export const messageValidate = joi.object({
    message: joi.string().min(1).required()
});