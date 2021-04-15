import userRoutes from './user/user-routes';
import searchRoutes from './search/search-routes';
import authRoutes from './auth/auth-routes';
import feedRoutes from './feed/feed-routes';

const routes = [
  authRoutes,
  feedRoutes,
  searchRoutes,
  userRoutes,
];

export default routes;