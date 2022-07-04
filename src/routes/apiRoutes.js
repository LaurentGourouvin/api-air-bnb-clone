const express = require('express')
const api = express.Router();
const usersController = require('../controllers/users');
const tokenMiddleWare = require('../middleware/jsonwebtoken');

api.post('/api/users/auth/register', usersController.createUser);
api.post('/api/users/auth/login', usersController.loginUser)
api.get('/api/users', tokenMiddleWare ,usersController.getUsers)

module.exports = api;