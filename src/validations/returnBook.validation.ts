import Joi from "joi";

export const returnBookSchema = {
  body: Joi.object().keys({
    score: Joi.number().min(0).max(10).required(),
  }),
};

export default {
  returnBookSchema,
};
