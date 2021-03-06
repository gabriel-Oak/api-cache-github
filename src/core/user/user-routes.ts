import { Router } from 'express';
import orm from '../../database';
import githubService from '../../services/github-service';
import imgbbService from '../../services/imgbb-service';
import redisService from '../../services/redis-service';
import { Route } from '../../utils/types';
import UserController from './user-controller';
import paths from './user-paths';

const userController = new UserController(
  githubService,
  redisService,
  imgbbService,
  orm,
);

const userRoutes: Route = {
  prefix: '/user',
  routes: Router(),
  tag: 'User',
  paths,
};


userRoutes.routes.post('/private/cover', userController.insertCover);
userRoutes.routes.get('/me', userController.getMe);
userRoutes.routes.get('/:username/repos', userController.repos);
userRoutes.routes.get('/:username', userController.findByName);
userRoutes.routes.get('/', userController.list);

export default userRoutes;