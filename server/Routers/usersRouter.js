import express from 'express';
import {
	ping,
	signIn,
	listUsers,
	login,
	isLogged,
} from '../Controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.get('/ping', ping);
usersRouter.get('/allUsers', listUsers);
usersRouter.post('/signin', signIn);
usersRouter.post('/login', login);
usersRouter.get('/islogged', isLogged);

export default usersRouter;
