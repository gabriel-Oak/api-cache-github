import { Router } from 'express';
import githubService from '../../services/github-service';
import UserController from './user-controller';

const userController = new UserController(githubService);

const userRoutes = Router();
userRoutes.get('/user', userController.list);

export default userRoutes;