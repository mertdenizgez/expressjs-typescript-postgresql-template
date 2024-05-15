import Joi from "joi";

export const createUserSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
  }),
};

export default {
  createUserSchema,
};
