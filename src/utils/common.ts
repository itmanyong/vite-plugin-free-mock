import bodyAny from 'body/any';
import { log } from './log';
import chalk from 'chalk';
import { IncomingMessage } from 'connect';
// 读取request的body
export function readBody(req: IncomingMessage): Promise<any> {
  return new Promise(resolve =>
    bodyAny(req, (error, body) => {
      if (error) {
        log(chalk.yellow(`错误 读取body失败`, error));
        resolve(null);
      }
      resolve(body);
    })
  );
}
