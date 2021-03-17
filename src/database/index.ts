import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import Debugger from '../utils/debugger';
import { HttpError } from '../utils/errors';
import entities from './entities';
export interface OrmOptions {
  debug: Debugger;
}

export class Orm {
  debug;
  private dbConection: Connection | null = null;

  constructor({ debug }: OrmOptions) {
    this.debug = debug;
  }

  async start() {
    try {
      this.debug.log('starting pg connection');
      this.dbConection = await createConnection({
        type: 'postgres',
        host: process.env.PG_HOST,
        port: Number(process.env.PG_PORT),
        username: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        synchronize: true,
        logging: false,
        entities,
        namingStrategy: new SnakeNamingStrategy(),
      });

      this.debug.log('pg connected');
    } catch (error) {
      this.debug.error(error);
      throw error;
    }
  }

  get connection() {
    if (this.dbConection) return this.dbConection;
    else throw new HttpError({
      message: 'Estamos desconectados da base',
      statusCode: 500,
    });
  }
}

const orm = new Orm({
  debug: new Debugger('typeorm')
});
export default orm;