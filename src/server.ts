import chalk from 'chalk';
import { Express } from 'express';

export interface ServerParams {
  port: number;
  json: () => any;
  cors: () => any;
}

export default class Server {
  express: Express;
  debug: (...args: any[]) => void;

  constructor(express: Express, debug: (...args: any[]) => void) {
    this.debug = debug;
    this.express = express;
  }

  start({ port, json, cors }: ServerParams) {
    this.debug(chalk.blue('Starting application'));

    this.express.use(json());
    this.express.use(cors());

    this.express.listen(port, () => {
      this.debug(chalk.blue(`Server is runnign at port: ${port}`));
    });
  };
}