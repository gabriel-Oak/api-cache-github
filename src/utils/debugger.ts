import chalk from "chalk";

class Debugger {
  prefix;
  chalk;

  constructor(prefix: string) {
    this.prefix = prefix;
    const colors = [
      chalk.blue,
      chalk.cyan,
      chalk.gray,
      chalk.black,
      chalk.white,
      chalk.red,
      chalk.green,
      chalk.magenta,
    ];
    this.chalk = colors[Math.floor(Math.random() * (colors.length - 1))];
  }

  log(...args: any[]) {
    const { log } = console;
    log(this.chalk(`[${this.prefix}]:`, ...args));
  }

  warn(...args: any[]) {
    const { warn } = console;
    warn(this.chalk(`[${this.prefix}]:`, ...args));
  }

  error(...args: any[]) {
    const { error } = console;
    error(this.chalk.red.bold(`[${this.prefix}]:`, ...args));
  }
}

export default Debugger;