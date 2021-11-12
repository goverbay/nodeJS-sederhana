const Joi = require('joi');

const postAuthenticationsSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const putAuthenticationsSchema = Joi.object({
    refreshToken: Joi.string().required(),
});

const deleteAuthenticationsSchema = Joi.object({
    refreshToken: Joi.string().required(),
});

module.exports = {
    postAuthenticationsSchema,
    putAuthenticationsSchema,
    deleteAuthenticationsSchema,
}