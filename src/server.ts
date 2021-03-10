import { Express, NextFunction, Request, Response } from 'express';
import * as Sentry from '@sentry/node';
import * as Tracing from "@sentry/tracing";
import { Route } from './utils/types';
import Debugger from './utils/debugger';
import 'express-async-errors';
import Youch from 'youch';
import { HttpError } from './utils/errors';
import Swagger from './utils/swagger';
import exphbs from 'express-handlebars';
import path from 'path';

type ConfigFunction = () => any;
export interface ServerParams {
  port: number;
  json: ConfigFunction;
  cors: ConfigFunction;
}

export default class Server {
  express;
  debug;
  private routes;
  private swagger;

  constructor(
    express: Express, debug: Debugger, routes: Route[], swagger: Swagger,
  ) {
    this.debug = debug;
    this.express = express;
    this.routes = routes;
    this.swagger = swagger;

    Sentry.init({
      dsn: process.env.SENTRY_HOST,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app: this.express }),
      ],
      tracesSampleRate: 1.0,
    });
  }

  reportException(error: Error) {
    this.debug.error(error);
    Sentry.captureException(error);
  }

  start({ port, json, cors }: ServerParams) {
    this.debug.log('Starting application');

    this.configEngine();

    this.express.use(json());
    this.express.use(cors());
    this.express.use(Sentry.Handlers.requestHandler());
    this.express.use(Sentry.Handlers.tracingHandler());

    this.configRoutes();
    this.swagger.init(this.express);
    this.express.use(Sentry.Handlers.errorHandler());
    this.exceptionHandler();

    this.express.listen(port, () => {
      this.debug.log(`Server is runnign at port: ${port}`);
    });
  };

  private configRoutes() {
    this.routes.forEach((route) => this.express.use(route.prefix, route.routes));
  }

  private configEngine() {
    this.express.engine('hbs', exphbs({
      defaultLayout: 'main',
      extname: '.hbs',
      layoutsDir: path.join(__dirname, '/views'),
    }));
    this.express.set('view engine', 'hbs');
    this.express.set('views', path.join(__dirname, '/views'));
  }

  private exceptionHandler() {
    this.express.use(async (
      err: HttpError,
      req: Request,
      res: Response,
      _next: NextFunction
    ) => {
      this.reportException(err);
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