import chalk from "chalk";

const prefix = "[R3-BLOG]";

export class Logger {
    static info(msg: string) {
        console.log(`${chalk.green.bold(prefix)} ${msg}`);
    }

    static warn(msg: string) {
        console.log(`${chalk.yellow.bold(prefix)} ${msg}`);
    }

    static error(msg: string) {
        console.log(`${chalk.red.bold(prefix)} ${msg}`);
    }

    static success(msg: string) {
        console.log(`${chalk.blue.bold(prefix)} ${msg}`);
    }
}
