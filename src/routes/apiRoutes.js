const express = require('express')
const api = express.Router();
const usersController = require('../controllers/users')

api.post('/api/users/auth/register', usersController.createUser);
api.post('/api/users/auth/login', usersController.loginUser)
api.get('/api/users', usersController.getUsers)

module.exports = api;