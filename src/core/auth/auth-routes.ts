import { Route } from '../../utils/types';
import { Router } from 'express';
import paths from './authRoutes-paths';
import AuthController from './auth-controller';
import githubService from '../../services/github-service';

const authController = new AuthController(githubService);

const authRoutes: Route = {
  prefix: '/auth',
  routes: Router(),
  tag: 'Auth',
  paths,
};

authRoutes.routes.get('/authorize', authController.authorize);
authRoutes.routes.get('/success', authController.success);
authRoutes.routes.get('/', authController.auth);

export default authRoutes;