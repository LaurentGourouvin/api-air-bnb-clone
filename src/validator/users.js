const Joi = require('joi');

const userSchema = Joi.object().keys({
    username: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().required(),
});

module.exports = userSchema;