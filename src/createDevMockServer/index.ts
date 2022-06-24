/*
 * @Author: itmanyong itmanyong@gmail.com
 * @Date: 2022-06-24 21:00:51
 * @LastEditors: itmanyong itmanyong@gmail.com
 * @LastEditTime: 2022-06-25 03:35:38
 * @FilePath: \vite-plugin-free-mock\src\createDevMockServer\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NextHandleFunction } from 'connect';
import {
  OPTIONS_RESULT,
  DB_VIRTUAL_RESULT,
  APIS_VIRTUAL_RESULT,
  METHOD_TYPE,
  API_RESULT_TYPE,
} from '../types';
import { log } from '../utils/log';
import { execParams } from '../utils/regexparam';
import { readBody } from '../utils/common';
import { send, sendJson } from '../utils/send';
import { content_type } from '../contans';
import chalk from 'chalk';
import qs from 'qs';
import mockjs from 'mockjs';
export async function createDevMockServer(
  _options: OPTIONS_RESULT,
  _db: DB_VIRTUAL_RESULT,
  _apis: APIS_VIRTUAL_RESULT
) {
  const { logger } = _options;
  const middleware: NextHandleFunction = async (req: any, res: any, next) => {
    const reqUrl = req.url as string,
      reqMethod = (req.method as string).toLowerCase() as METHOD_TYPE;
    const matchApi: API_RESULT_TYPE =
      _apis[reqMethod]?.find((api: API_RESULT_TYPE) =>
        api.pattern.test(api.strict ? reqUrl : reqUrl.split('?')[0] || reqUrl)
      ) || null;
    // 接口匹配成功
    if (matchApi) {
      const { headers } = req;
      const {
        pattern,
        keys,
        timeout,
        meta,
        render,
        intercept,
        handlerRequest,
      } = matchApi;
      if (logger)
        log(chalk.cyan(`收到请求 ${reqMethod} ${reqUrl} 延时 ${timeout}ms`));
      const params = execParams(reqUrl, { pattern, keys }) || {};
      const query =
        reqUrl.indexOf('?') > 0 ? qs.parse(reqUrl.split('?')[1]) : {};
      const body = reqMethod != 'get' ? (await readBody(req)) || {} : {};
      const handlerParams = {
        req,
        res,
        params,
        query,
        body,
        meta,
        headers,
        types: content_type,
        intercept,
        mockjs,
      };
      // 请求拦截器触发(全局->模块->接口)
      intercept.global =
        _options.global.handlerRequest?.(handlerParams, matchApi, _options) ||
        null;
      intercept.module =
        handlerRequest[0]?.(handlerParams, matchApi, _options) || null;
      intercept.api =
        handlerRequest[1]?.(handlerParams, matchApi, _options) || null;
      // 触发render
      if (render) {
        // 重写res的send方法
        res.send = send(req, res, _options, matchApi);
        // 额外快捷send方法
        res.sendJson = sendJson(req, res, _options, matchApi);
        // 延时timeout
        setTimeout(() => render(handlerParams, _db, _options), timeout);
      } else {
        log(chalk.red(`错误 render未定义`));
        res.end();
      }
      return;
    }
    next();
  };

  return middleware;
}
