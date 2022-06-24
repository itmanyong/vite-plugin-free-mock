/*
 * @Author: itmanyong itmanyong@gmail.com
 * @Date: 2022-06-22 03:40:03
 * @LastEditors: itmanyong itmanyong@gmail.com
 * @LastEditTime: 2022-06-24 16:45:43
 * @FilePath: \vite-plugin-api-mock\src\types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import type { Mockjs } from 'mockjs';

export type Recordable<T = any> = Record<string, T>;

export type CONTENT_TYPE = {
  html: string;
  text: string;
  xml: string;
  jpeg: string;
  gif: string;
  png: string;
  formData: string;
  xhtml: string;
  dataXml: string;
  atomXml: string;
  json: string;
  pdf: string;
  word: string;
  stream: string;
  form: string;
}

export type METHOD_TYPE =
  | 'get'
  | 'post'
  | 'put'
  | 'patch'
  | 'delete'
  | 'options'
  | 'head'
  | 'trace';


export interface DB_FUNCTION_PARAMS {
  mockjs: Mockjs;
}

export declare interface PRE_CONFIG {
  prefix?: string;
  suffix?: string;
  method?: METHOD_TYPE;
  timeout?: number;
  statusCode?: number;
  strict?: boolean;
  meta?: object;
}

export declare interface API_CONFIG_TYPE {
  url?: string;
  pattern?: RegExp;
  keys?: string[];
  method?: METHOD_TYPE;
  timeout?: number;
  statusCode?: number;
  strict?: boolean;
  render?: ResponseType;
}

export interface API_RESULT_TYPE {
  url: string;
  pattern: RegExp;
  keys: string[];
  method: METHOD_TYPE;
  timeout: number;
  statusCode: number;
  strict: boolean;
  render: ResponseType;
  meta: object;
}

export interface APIS_CONFIG_TYPE extends PRE_CONFIG {
  apis?: API_CONFIG_TYPE[]
}

export type APIS_VIRTUAL_RESULT = {
  [key in METHOD_TYPE]: any[];
};

export interface DB_CONFIG_TYPE {
  [key: string]: any[] | ((v: DB_FUNCTION_PARAMS) => any[] | object);
}

export interface DB_VIRTUAL_RESULT {
  [key: string]: any[];
}

export interface GLOBAL_CONFIG_TYPE extends PRE_CONFIG { }

export type OPTIONS_CONFIG = {
  apis?: APIS_CONFIG_TYPE[];
  db?: DB_CONFIG_TYPE;
  global?: GLOBAL_CONFIG_TYPE;
  devMock?: boolean;
  prodMock?: boolean;
  logger?: boolean;
}

export type OPTIONS_RESULT = {
  apis: APIS_CONFIG_TYPE[];
  db: DB_CONFIG_TYPE;
  global: GLOBAL_CONFIG_TYPE;
  devMock: boolean;
  prodMock: boolean;
  logger: boolean;
}
