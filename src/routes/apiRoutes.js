const express = require('express')
const api = express.Router();
const usersController = require('../controllers/users')

api.post('/api/users/register', usersController.createUser);
api.get('/api/users', usersController.getUsers)

module.exports = api;