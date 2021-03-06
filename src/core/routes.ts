import userRoutes from './user/user-routes';
import searchRoutes from './search/search-routes';
import { Response, Request, Router } from 'express';
import { Route } from '../utils/types';

const indexRoute: Route = {
  prefix: '/',
  routes: Router(),
};
indexRoute.routes.get('/', async (_req: Request, res: Response) => res.json({
  message: 'Hellow World',
  date: new Date().toISOString(),
}));


const routes = [
  indexRoute,
  searchRoutes,
  userRoutes,
];

export default routes;