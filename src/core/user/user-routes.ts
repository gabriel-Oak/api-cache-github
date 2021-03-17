import { Router } from 'express';
import orm from '../../database';
import processFile from '../../middlewares/process-file';
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


userRoutes.routes.get('/:username/repos', userController.repos);
userRoutes.routes.get('/:username', userController.findByName);
userRoutes.routes.get('/', userController.list);
userRoutes.routes.post('/private/cover', processFile, userController.insertCover);

export default userRoutes;