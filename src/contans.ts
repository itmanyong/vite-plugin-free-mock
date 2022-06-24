/*
 * @Author: itmanyong itmanyong@gmail.com
 * @Date: 2022-06-24 13:42:10
 * @LastEditors: itmanyong itmanyong@gmail.com
 * @LastEditTime: 2022-06-25 03:35:25
 * @FilePath: \vite-plugin-free-mock\src\contans.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import {
  OPTIONS_CONFIG,
  PRE_CONFIG,
  APIS_VIRTUAL_RESULT,
  CONTENT_TYPE,
} from './types';

export const log_prefix: string = 'vite:free-mock';

export const pre_config: PRE_CONFIG = {
  prefix: '',
  suffix: '',
  method: 'get',
  timeout: 1024 * 1,
  statusCode: 200,
  strict: false,
  meta: {},
  responseType: 'json',
  handlerRequest: undefined,
  handlerResponse: undefined,
};

export const options_config: OPTIONS_CONFIG = {
  global: pre_config,
  apis: [],
  db: {},
  devMock: true,
  prodMock: false,
  logger: false,
};

export const apis_virtual_result: APIS_VIRTUAL_RESULT = {
  get: [],
  post: [],
  put: [],
  patch: [],
  delete: [],
  options: [],
  head: [],
  trace: [],
};

export const utf8: string = 'charset=UTF-8';

export const content_type: CONTENT_TYPE = {
  // application
  xhtml: 'application/xhtml+xml',
  dataXml: 'application/xml',
  atomXml: 'application/atom+xml',
  json: 'application/json',
  pdf: 'application/pdf',
  word: 'application/msword',
  stream: 'application/octet-stream',
  form: 'application/x-www-form-urlencoded',
  // 媒体
  html: 'text/html',
  text: 'text/plain',
  xml: 'text/xml',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  png: 'image/png',
  formData: 'multipart/form-data',
};
