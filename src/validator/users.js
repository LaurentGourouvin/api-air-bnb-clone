const Joi = require('joi');

const createUserSchema = Joi.object().keys({
    username: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    password: Joi.string().min(4).required(),
    email: Joi.string().required(),
}).required();

const loginUserSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
}).required();

module.exports = {createUserSchema, loginUserSchema};