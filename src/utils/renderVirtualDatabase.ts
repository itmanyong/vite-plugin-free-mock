/*
 * @Author: itmanyong itmanyong@gmail.com
 * @Date: 2022-06-24 14:35:15
 * @LastEditors: itmanyong itmanyong@gmail.com
 * @LastEditTime: 2022-06-25 00:11:40
 * @FilePath: \vite-plugin-free-mock\src\utils\renderVirtualDatabase.ts
 * @Description: 根据db配置通过mockjs生成虚拟数据
 * 1.定义方式
 * {
 *   dbName:any[]
 *   dbName2:({mockjs})=>any[]|object
 * }
 * 2.默认会对获取到数据再次进行mockjs.mock覆盖一次得到最终数据
 */

import { OPTIONS_RESULT, DB_VIRTUAL_RESULT } from '../types';
import mockjs from 'mockjs';

export default (_options: OPTIONS_RESULT): DB_VIRTUAL_RESULT => {
  const database: DB_VIRTUAL_RESULT = {},
    _db = _options.db || {};

  for (let _dbName in _db) {
    const _dbValue = _db[_dbName];
    database[_dbName] = mockjs.mock(
      typeof _dbValue === 'function' ? _dbValue({ mockjs }) : _dbValue
    );
  }

  return database;
};
