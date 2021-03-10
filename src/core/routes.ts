import userRoutes from './user/user-routes';
import searchRoutes from './search/search-routes';
import authRoutes from './auth/auth-routes';

const routes = [
  authRoutes,
  searchRoutes,
  userRoutes,
];

export default routes;