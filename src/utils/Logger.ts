import Chalk from "chalk";

class Logger {
  private static getTimestamp() {
    return new Date().toLocaleString();
  }

  private static getDateString(): string;
  private static getDateString(type?: string): string;
  private static getDateString(type?: string): string {
    return Chalk.cyan.bold(
      `[${this.getTimestamp()}]${type ? ` ${type}` : ""} => `
    );
  }

  static internalError(
    message: string,
    type?: string,
    ...optionalParams: any[]
  ) {
    console.log(" ");
    console.log(
      Chalk.red.bold(`[INTERNAL ERROR] ${this.getDateString(type)} => `)
    );
    if (message) console.error(Chalk.red(message, ...optionalParams));
    console.log(Chalk.redBright.bold("REPORT TO DEVELOPER!"));
    console.log(Chalk.red.bold(`[/INTERNAL ERROR]`));
    console.log(" ");
  }

  static userError(message: string, type?: string, ...optionalParams: any[]) {
    console.log(" ");
    console.log(Chalk.red.bold(`[USER ERROR] ${this.getDateString(type)} => `));
    if (message) console.error(Chalk.red(message, ...optionalParams));
    console.log(Chalk.red.bold(`[/USER ERROR]`));
    console.log(" ");
  }

  static log(message: string, type?: string, ...optionalParams: any[]) {
    console.log(
      this.getDateString(type),
      Chalk.yellow(message, ...optionalParams)
    );
  }
}

export default Logger;
