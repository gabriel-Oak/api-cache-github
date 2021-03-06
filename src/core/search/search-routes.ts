import { Router } from 'express';
import githubService from '../../services/github-service';
import { Route } from '../../types';
import SearchController from './search-controller';

const searchController = new SearchController(githubService);

const searchRoutes: Route = {
  prefix: '/search',
  routes: Router(),
};

searchRoutes.routes.get('/user', searchController.searchUsers);

export default searchRoutes;