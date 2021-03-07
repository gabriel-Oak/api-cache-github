import './config';
import express, { json } from 'express';
import Server from './server';
import cors from 'cors';
import routes from './core/routes';
import Debugger from './utils/debugger';
import swaggerDocument from '../swagger.json';
import Swagger from './utils/swagger';

const server = new Server(
  express(),
  new Debugger('server'),
  routes,
  new Swagger(swaggerDocument, routes),
);

try {
  server.start({
    cors,
    json,
    port: Number(process.env.PORT || 8000),
  });
} catch (error) {
  server.reportException(error);
}