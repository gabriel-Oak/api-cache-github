import { Express } from 'express';
import { Route } from './types';
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

  constructor(express: Express, debug: Debugger, routes: Route[]) {
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
    this.routes.forEach((route) => this.express.use(route.prefix, route.routes));
  }
}