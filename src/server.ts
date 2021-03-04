import chalk from 'chalk';
import { Express, Router } from 'express';
import { indexRoute } from './core/indexRoute';
import { Debugger } from './types';

export interface ServerParams {
  port: number;
  json: () => any;
  cors: () => any;
}

export default class Server {
  express: Express;
  debug: Debugger;
  routes: Router[];

  constructor(express: Express, debug: Debugger, routes: Router[]) {
    this.debug = debug;
    this.express = express;
    this.routes = routes;
  }

  start({ port, json, cors }: ServerParams) {
    this.debug(chalk.blue('Starting application'));

    this.express.use(json());
    this.express.use(cors());

    this.configRoutes();

    this.express.listen(port, () => {
      this.debug(chalk.blue(`Server is runnign at port: ${port}`));
    });
  };

  private configRoutes() {
    this.express.get('/', indexRoute);
    this.routes.forEach((route) => this.express.use(route));
  }
}