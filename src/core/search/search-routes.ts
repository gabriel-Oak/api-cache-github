import { Router } from 'express';
import githubService from '../../services/github-service';
import { Route } from '../../utils/types';
import SearchController from './search-controller';
import paths from './search-paths.json';

const searchController = new SearchController(githubService);

const searchRoutes: Route = {
  prefix: '/search',
  routes: Router(),
  tag: 'Search',
  paths,
};

searchRoutes.routes.get('/user', searchController.searchUsers);

export default searchRoutes;