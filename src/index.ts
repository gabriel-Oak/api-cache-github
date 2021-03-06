import './config';
import express, { json } from 'express';
import Server from './server';
import cors from 'cors';
import routes from './core/routes';
import Debugger from './utils/debugger';
import swaggerDocument from './swagger';
import Swagger from './utils/swagger';
import orm from './database';

const server = new Server({
  express: express(),
  debug: new Debugger('server'),
  swagger: new Swagger(swaggerDocument, routes),
  orm,
  routes,
});

server.start({
  cors,
  json,
  port: Number(process.env.PORT || 8000),
}).catch((error) => {
  server.reportException(error);
});