import { Router } from 'express';
import githubService from '../../services/github-service';
import redisService from '../../services/redis-service';
import { Route } from '../../utils/types';
import UserController from './user-controller';
import paths from './user-paths';

const userController = new UserController(githubService, redisService);

const userRoutes: Route = {
  prefix: '/user',
  routes: Router(),
  tag: 'User',
  paths,
};

userRoutes.routes.get('/:username/repos', userController.repos);
userRoutes.routes.get('/:username', userController.findByName);
userRoutes.routes.get('/', userController.list);
userRoutes.routes.post('/private/cover', userController.insertCover);

export default userRoutes;