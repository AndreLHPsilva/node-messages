import chalk from "chalk";
import moment from "moment";

export function log(message: string) {
    console.log(`${chalk.blue(`[${process.pid}]`)}${chalk.green(`[${moment().format("YYYY-MM-DD hh:mm:ss")}]`)} - ${chalk.yellow(message)}`);
    return;
}