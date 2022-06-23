/*
 * @Author: itmanyong itmanyong@gmail.com
 * @Date: 2022-06-22 03:40:03
 * @LastEditors: itmanyong itmanyong@gmail.com
 * @LastEditTime: 2022-06-24 00:43:36
 * @FilePath: \vite-plugin-api-mock\src\types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { IncomingMessage, ServerResponse } from 'http';
import type { Mockjs } from 'mockjs';


export type Any = string | number | boolean | null | undefined | object | [];

export type Recordable<T = any> = Record<string, T>;

export type DataBaseResult = {
  [key: string]: Any | Any[];
};



export type ResponseCtx = {
  req: IncomingMessage;
  res: ServerResponse;
  query: Recordable;
  params: Recordable;
  body: Recordable;
  meta: any | null | undefined;
};

export type ResponseType = (ctx: ResponseCtx, databse: DataBaseResult) => any;


// new

export interface KeyAny{
  [key:string]:any
}
export type METHOD_TYPE =
  | 'get'
  | 'post'
  | 'put'
  | 'patch'
  | 'delete'
  | 'options'
  | 'head'
  | 'trace'
  | 'all';



export interface API_ITEM_RULES{
  pattern:RegExp;
  keys:string[]
}
export declare interface GLOBAL_CONFIG  {
  prefix?: string;
  suffix?: string;
  method?: METHOD_TYPE;
  timeout?: number;
  statusCode?: number;
  meta?: any;
  strict?:boolean;
  response?: ResponseType;
  render?:any
};
export declare interface API_ITEM_CONFIG{
  url:string;
  method?:METHOD_TYPE;
  timeout?:number;
  statusCode?:number;
  rules?:API_ITEM_RULES;
  strict?:boolean;
  response?: ResponseType;
  render?:any
}
export declare interface API_ITEM_RESULT{
  url:string;
  method:METHOD_TYPE;
  timeout:number;
  statusCode:number;
  rules:API_ITEM_RULES;
  strict:boolean;
  response?: ResponseType;
  render?:any
}
export type APIS_TYPE = {
  [key in METHOD_TYPE]: API_ITEM_RESULT[];
}

export declare interface API_MODULE_CONFIG extends GLOBAL_CONFIG {
  apis?:API_ITEM_CONFIG[]
};





export type DB_ITEM_CONFIG = any[] | ((mockjs:Mockjs)=>any[])

export type DB_CONFIG = {
  [key:string]:DB_ITEM_CONFIG
}

export type OPTIONS_CONFIG={
  apis?:API_MODULE_CONFIG[];
  db?:DB_CONFIG;
  global?:GLOBAL_CONFIG;
}