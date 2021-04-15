import { Router } from 'express';
import githubService from '../../services/github-service';
import { Route } from '../../utils/types';
import FeedController from './feed-controller';
import paths from './feed-paths';

const feedController = new FeedController(githubService);

const feedRoutes: Route = {
  prefix: '/feed',
  routes: Router(),
  tag: 'User',
  paths,
};


feedRoutes.routes.get('/private/', feedController.getFeed);

export default feedRoutes;