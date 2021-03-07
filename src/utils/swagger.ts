import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { Route } from './types';

interface SwaggerDocument {
  paths: any;
  tags: string[];
  info: object;
  consumes: string[];
  produces: string[];
}

export default class Swagger {
  document: SwaggerDocument;

  constructor(document: any, routes: Route[]) {
    this.document = {
      ...document,
      tags: [] as string[],
      paths: {}
    };
    routes.forEach((route) => {
      this.document.tags.push(route.tag);
      route.paths.forEach((path) => {
        this.document.paths[path.key] = path.value;
      });
    });
  }

  init(express: Express) {
    express.use('/', swaggerUi.serve, swaggerUi.setup(this.document));
  }
}