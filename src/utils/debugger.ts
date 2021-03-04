import chalk from "chalk";

class Debugger {
  prefix;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  log(...args: any[]) {
    const { log } = console;
    log(chalk.blue(`${this.prefix}:`, ...args));
  }

  warn(...args: any[]) {
    const { warn } = console;
    warn(chalk.yellow(`${this.prefix}:`, ...args));
  }

  error(...args: any[]) {
    const { error } = console;
    error(chalk.red.bold(`${this.prefix}:`, ...args));
  }
}

export default Debugger;