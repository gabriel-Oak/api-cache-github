import { Express, NextFunction, Request, Response } from 'express';
import { Route } from './utils/types';
import Debugger from './utils/debugger';
import 'express-async-errors';
import Youch from 'youch';
import { HttpError } from './utils/errors';

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
    this.exceptionHandler();

    this.express.listen(port, () => {
      this.debug.log(`Server is runnign at port: ${port}`);
    });
  };

  private configRoutes() {
    this.routes.forEach((route) => this.express.use(route.prefix, route.routes));
  }

  private exceptionHandler() {
    this.express.use(async (
      err: HttpError,
      req: Request,
      res: Response,
      _next: NextFunction
    ) => {
      this.debug.error(err);
      const status = err.statusCode ? err.statusCode : 500;
      const error = err.statusCode || process.env.NODE_ENV === 'production'
        ? {
          message: err.message || 'Oops, estamos com algum problema interno :('
        } : (await new Youch(err, req).toJSON()).error;

      return res
        .status(status)
        .json(error);
    });
  }
}