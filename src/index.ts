/*
 * @Author: itmanyong itmanyong@gmail.com
 * @Date: 2022-06-22 03:28:11
 * @LastEditors: itmanyong itmanyong@gmail.com
 * @LastEditTime: 2022-06-24 01:11:15
 * @FilePath: \vite-plugin-api-mock\src\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @desc mock插件开发计划~~~~
 * @desc 功能计划
 * URL支持字符串、正则、query参数、路径参数、动态参数可忽略、后缀
 * method类型支持全部，格外新增all类型(表示只要匹配url类型可不管)
 * timeout可设置延时时间
 * code可设置返回状态码
 * response需要返回，接收参数为:第一个={req,res,query,params,body,env}，第二个=database
 * 全局可配置URL前缀/后缀、超时、默认请求类型、默认状态码。(全部配置支持函数返回结果)
 * 支持配置数据库、自动生成各种URL、支持工厂函数生成请求
 * 内置mockjs生成规则
 * 支持请求不同的Content-Type解析
 * 支持外部传入数据统筹到全局定义为env
 * 内部提供不同的send方法
 * 模块级别的请求/响应拦截器
 * @desc 问题
 * 请求排队阻塞问题
 */
import { OPTIONS_CONFIG } from './types';
import { ViteDevServer } from 'vite';

import {
  merge,
  renderVirtualDataBase,
  renderVirtualApi,
  createDevMockMiddleware,
} from './utils';
import { defaultOption } from './contans';

export default function vitePluginApiMock(options: OPTIONS_CONFIG = {}) {
  // 融合配置
  const _options = merge(defaultOption, options);
  // 生成数据池
  const virtualDataBase = renderVirtualDataBase(_options.db);
  // 生成接口
  const virtualApi = renderVirtualApi(_options.apis, _options.global);
  // 为接口的url生成正则
  return {
    name: 'vite:api-mock',
    enforce: 'pre',
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req, res, next) =>
        createDevMockMiddleware(
          {
            options: virtualDataBase,
            db: virtualDataBase,
            apis: virtualApi,
          },
          req,
          res,
          next
        )
      );
    },
  };
}
