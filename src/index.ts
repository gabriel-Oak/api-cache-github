import 'dotenv/config';
import express, { json } from 'express';
import Server from './server';
import cors from 'cors';
import chalk from 'chalk';

const { log } = console;
const debug = (...args: any[]) => log('server: ', ...args);

const server = new Server(express(), debug);

try {
  server.start({
    cors,
    json,
    port: Number(process.env.PORT || 8000),
  });
} catch (error) {
  server.debug(chalk.red.bold(error));
}