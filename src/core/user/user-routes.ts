import { Router } from 'express';
import githubService from '../../services/github-service';
import redisService from '../../services/redis-service';
import UserController from './user-controller';

const userController = new UserController(githubService, redisService);

const userRoutes = Router();
userRoutes.get('/user', userController.list);

export default userRoutes;