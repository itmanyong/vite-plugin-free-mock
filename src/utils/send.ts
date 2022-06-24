import { content_type } from '../contans';
import { OPTIONS_RESULT, API_RESULT_TYPE } from '../types';
import { isString, isBuffer, isArrayBuffer } from 'lodash';
import { log } from '../utils/log';
import chalk from 'chalk';
import { IncomingMessage } from 'connect';
import { ServerResponse } from 'http';
// 返回send工具方法
export function send(
  req: IncomingMessage,
  res: ServerResponse,
  _options: OPTIONS_RESULT,
  api: API_RESULT_TYPE
): (...args: any[]) => void {
  return function(...rest: any[]): void {
    // 响应拦截器触发(api->module->global)
    const { handlerResponse } = api;
    handlerResponse[1]?.(rest[0], api, _options);
    handlerResponse[0]?.(rest[0], api, _options);
    _options.global.handlerResponse?.(rest[0], api, _options);
    // 预检数据格式
    if (!isString(rest[0]) && !isBuffer(rest[0]) && !isArrayBuffer(rest[0])) {
      rest[0] = JSON.stringify(rest[0]);
    }
    // 设置状态码
    res.statusCode = api.statusCode;
    // 设置响应头
    res.setHeader('Content-Type', content_type[api.responseType]);
    // 结束请求
    res.end(...rest);
    // 最终输出结果
    if (_options.logger) {
      log(chalk.yellowBright(`发送响应 ${req.method} ${req.url}`));
    }
  };
}

// 返回sendJson工具函数
export function sendJson(
  req: IncomingMessage,
  res: ServerResponse,
  _options: OPTIONS_RESULT,
  api: API_RESULT_TYPE
): (body: any) => void {
  return function(body: any): void {
    let chunk: string | Buffer = JSON.stringify(body);
    if (chunk) {
      chunk = Buffer.from(chunk, 'utf-8');
      res.setHeader('Content-Length', chunk.length);
    }
    send(req, res, _options, api)(chunk, 'utf8');
  };
}
