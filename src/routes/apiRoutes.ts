import express, { Router } from 'express';
import usersController from '../controllers/users';

const api : Router = express.Router();


api.post('/api/users/auth/register', usersController.createUser);
api.post('/api/users/auth/login', usersController.loginUser)

export default api;