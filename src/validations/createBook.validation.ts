import Joi from "joi";

export const createBookSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

export default {
  createBookSchema,
};
