/*
 * @Author: itmanyong itmanyong@gmail.com
 * @Date: 2022-06-22 05:14:29
 * @LastEditors: itmanyong itmanyong@gmail.com
 * @LastEditTime: 2022-06-23 23:40:07
 * @FilePath: \vite-plugin-api-mock\src\contans.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 初始options值
import { OPTIONS_CONFIG, APIS_TYPE } from './types';

export const defaultOption: OPTIONS_CONFIG = {
  global: {
    prefix: '',
    suffix: '',
    method: 'get',
    timeout: 1024 * 1,
    statusCode: 200,
    meta: {},
    strict: false,
  },
  apis: [],
  db: {},
};

export const defaultApiTypes: APIS_TYPE = {
  get: [],
  post: [],
  put: [],
  patch: [],
  delete: [],
  options: [],
  head: [],
  trace: [],
  all: [],
};
