import joi from "joi";

export const postValidate = joi.object({
    description: joi.string().max(150).required()
});