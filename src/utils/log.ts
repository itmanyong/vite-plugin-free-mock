
import chalk from 'chalk';
import { log_prefix } from '../contans'




// 打印日志
export function log(...rest: any[]) {
    console.log(chalk.green(log_prefix), ...rest)
}


