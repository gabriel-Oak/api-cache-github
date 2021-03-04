import 'dotenv/config';
import express, { json } from 'express';
import Server from './server';
import cors from 'cors';
import chalk from 'chalk';
import { Debugger } from './types';
import routes from './core/routes';

const { log } = console;
const debug: Debugger = (...args) => log('server: ', ...args);

const server = new Server(express(), debug, routes);

try {
  server.start({
    cors,
    json,
    port: Number(process.env.PORT || 8000),
  });
} catch (error) {
  server.debug(chalk.red.bold(error));
}