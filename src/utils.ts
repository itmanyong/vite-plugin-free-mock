/*
 * @Author: itmanyong itmanyong@gmail.com
 * @Date: 2022-06-22 22:34:41
 * @LastEditors: itmanyong itmanyong@gmail.com
 * @LastEditTime: 2022-06-24 16:42:23
 * @FilePath: \vite-plugin-api-mock\src\utils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import {
  DB_CONFIG,
  KeyAny,
  GLOBAL_CONFIG,
  API_MODULE_CONFIG,
  APIS_TYPE,
  Recordable,
  API_ITEM_RESULT,
} from './types';
import mockjs from 'mockjs';
import { defaultApiTypes } from './contans';
import { ServerResponse } from 'http';
import { Connect } from 'vite';
import { parse } from 'regexparam';
import chalk from 'chalk';
import qs from 'qs';
// 生成数据池
export function renderVirtualDataBase(db?: DB_CONFIG): any {
  const database: { [key: string]: [] | object } = {};

  for (let keyName in db) {
    const keyValue = db[keyName];
    database[keyName] = mockjs.mock(
      typeof keyValue === 'function' ? keyValue(mockjs) : keyValue
    );
  }

  return database;
}
// 生成接口配置
export function renderVirtualApi(
  apis: API_MODULE_CONFIG[],
  global: GLOBAL_CONFIG
): APIS_TYPE {
  const APIS = defaultApiTypes;
  // 外层模块
  for (let i = 0, len = apis.length; i < len; i++) {
    const { apis: apiList = [], ...config } = apis[i];
    // 模块配置+全局配置
    apiList.forEach(api => {
      const url = `${global.prefix}${config.prefix || ''}${api.url}${
        'suffix' in config ? config.suffix : global.suffix || ''
      }`;
      const _api = {
        url: url,
        method: (api.method || config.method || global.method)?.toLowerCase(),
        timeout: api.timeout || config.timeout || global.timeout,
        statusCode: api.statusCode || config.statusCode || global.statusCode,
        response: api.response || null,
        render: api.render || config.render || global.render || null,
        rules: parse(url),
        strict: api.strict || config.strict || global.strict,
      };

      if (_api.method) {
        APIS[_api.method]
          ? APIS[_api.method].push(_api)
          : (APIS[_api.method] = [_api]);
      }
    });
  }

  return APIS;
}
// 判断对象与否
export function isObject(value: any): boolean {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
}
// 融合
export function merge(source: KeyAny, other: KeyAny) {
  if (!isObject(source) || !isObject(other)) {
    return other === undefined ? source : other;
  }
  return Object.keys({
    ...source,
    ...other,
  }).reduce(
    (acc, key) => {
      acc[key] = merge(source[key], other[key]);
      return acc;
    },
    Array.isArray(source) ? [] : {}
  );
}
function exec(
  path: string,
  result: {
    pattern: RegExp;
    keys: string[];
  }
) {
  let i = 0,
    out = {};
  let matches = result.pattern.exec(path);
  if (matches) {
    while (i < result.keys.length) {
      out[result.keys[i]] = matches[++i] || null;
    }
  }
  return out;
}

function parseJson(req: Connect.IncomingMessage): Promise<Recordable> {
  return new Promise(resolve => {
    let body = '';
    let jsonStr = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      try {
        jsonStr = JSON.parse(body);
      } catch (err) {
        jsonStr = '';
      }
      resolve(jsonStr as any);
      return;
    });
  });
}

/**
 * 重写send方法,防止不存在
 */
export function send(res: any, api: any, body: any): void {
  let chunk: any = JSON.stringify(body);
  if (chunk) {
    chunk = Buffer.from(JSON.stringify(body), 'utf-8');
    res.setHeader('Content-Length', chunk.length);
  }
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = api.statusCode;
  res.end(chunk, 'utf8');
}
// connect中间件
export async function createDevMockMiddleware(
  args: any,
  req: Connect.IncomingMessage,
  res: ServerResponse & KeyAny,
  next: Connect.NextFunction
): Promise<any> {
  const url = req.url as string;
  const method: string = req.method?.toLowerCase() || 'get';
  const matchApi = args.apis[method].find((api: API_ITEM_RESULT) =>
    api.rules.pattern.test(api.strict ? url : url.split('?')[0] || url)
  );
  if (matchApi) {
    // const {body} = req;
    const params = exec(url, matchApi.rules);
    const query = url.indexOf('?') > 0 ? qs.parse(url.split('?')[1]) : {};
    const body = (await parseJson(req)) || {};
    console.log(
      chalk.green(`vite:api-mock`),
      chalk.yellow(`收到请求 ${method} ${url}`)
    );
    console.log(chalk.cyan(`params`), params);
    console.log(chalk.cyan(`query`), query);
    console.log(chalk.cyan(`body`), body);
    const cbPrams = {
      req,
      res,
      query,
      params,
      body,
    };
    if (matchApi.render) {
      setTimeout(
        () => matchApi.render(cbPrams, args.db),
        matchApi.timeout || 0
      );
    } else if (matchApi.response) {
      // 重写send方法,默认情况会报错找不到????
      res.send = (result: any) => send(res, matchApi, result);
      // 运行配置中的handler方法返回数据
      // 延迟
      setTimeout(
        () => matchApi.response(cbPrams, args.db),
        matchApi.timeout || 0
      );
    } else {
      res.end('66');
    }
  } else {
    next();
  }
}
