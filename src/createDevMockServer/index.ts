/*
 * @Author: itmanyong itmanyong@gmail.com
 * @Date: 2022-06-24 13:57:18
 * @LastEditors: itmanyong itmanyong@gmail.com
 * @LastEditTime: 2022-06-24 18:23:26
 * @FilePath: \vite-plugin-free-mock\src\createDevMockServer\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NextHandleFunction } from 'connect'
import { OPTIONS_RESULT, DB_VIRTUAL_RESULT, APIS_VIRTUAL_RESULT, METHOD_TYPE, API_RESULT_TYPE } from '../types'
import { log } from '../utils/log'
import chalk from 'chalk';
import { execParams } from '../utils/regexparam'
import qs from 'qs'
import { readBody } from '../utils/common'
import * as sendApis from '../utils/send'




export async function createDevMockServer(_options: OPTIONS_RESULT, _db: DB_VIRTUAL_RESULT, _apis: APIS_VIRTUAL_RESULT) {
    const { logger } = _options;
    const middleware: NextHandleFunction = async (req: any, res: any, next) => {
        const reqUrl = req.url as string, reqMethod = (req.method as string).toLowerCase() as METHOD_TYPE;
        const matchApi = _apis[reqMethod]?.find((api: API_RESULT_TYPE) => api.pattern.test(api.strict ? reqUrl : reqUrl.split('?')[0] || reqUrl)) || null;

        if (matchApi) {
            const { headers } = req;
            const { pattern, keys, timeout, meta, render } = matchApi;
            if (logger) log(chalk.cyan(`收到请求 ${reqMethod} ${reqUrl} 延时 ${timeout}ms`));
            const params = execParams(reqUrl, { pattern, keys }) || null;
            const query = reqUrl.indexOf('?') > 0 ? qs.parse(reqUrl.split('?')[1]) : null;
            const body = reqMethod != 'get' ? (await readBody(req)) || null : null;
            if (render) {
                // 重写res的send方法
                res.send = sendApis.send;
                setTimeout(() => render({
                    req, res, params, query, body, meta, headers,
                    ...sendApis
                }, _db), timeout);
            } else {
                log(chalk.red(`错误 render未定义`))
            }
            res.send()
            return;
        }
        next();
    }


    return middleware;
}