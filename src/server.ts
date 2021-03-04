import { Express, Router } from 'express';
import { indexRoute } from './core/indexRoute';
import Debugger from './utils/debugger';

export interface ServerParams {
  port: number;
  json: () => any;
  cors: () => any;
}

export default class Server {
  express;
  debug;
  routes;

  constructor(express: Express, debug: Debugger, routes: Router[]) {
    this.debug = debug;
    this.express = express;
    this.routes = routes;
  }

  start({ port, json, cors }: ServerParams) {
    this.debug.log('Starting application');

    this.express.use(json());
    this.express.use(cors());

    this.configRoutes();

    this.express.listen(port, () => {
      this.debug.log(`Server is runnign at port: ${port}`);
    });
  };

  private configRoutes() {
    this.express.get('/', indexRoute);
    this.routes.forEach((route) => this.express.use(route));
  }
}