import Joi from "joi";

export const returnBookSchema = {
  body: Joi.object().keys({
    score: Joi.number().required(),
  }),
};

export default {
  returnBookSchema,
};
