import 'reflect-metadata';
import { createConnection } from 'typeorm';
import Debugger from '../utils/debugger';
import entities from './entities';
export interface OrmOptions {
  debug: Debugger;
}

export default class Orm {
  debug;

  constructor({ debug }: OrmOptions) {
    this.debug = debug;
  }

  async start() {
    try {
      this.debug.log('starting pg connection');
      await createConnection({
        type: 'postgres',
        host: process.env.PG_HOST,
        port: Number(process.env.PG_PORT),
        username: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        synchronize: true,
        logging: false,
        entities,
      });

      this.debug.log('pg connected');
    } catch (error) {
      this.debug.error(error);
      throw error;
    }
  }
}