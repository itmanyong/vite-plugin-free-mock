/*
 * @Author: itmanyong itmanyong@gmail.com
 * @Date: 2022-06-22 21:50:07
 * @LastEditors: itmanyong itmanyong@gmail.com
 * @LastEditTime: 2022-06-23 00:08:40
 * @FilePath: \vite-plugin-api-mock\examples\demo-react\mock\createMockServer.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 统一导入接口配置
import api_users from './apis/users';

// 统一导入虚拟数据池
import db_users from './database/users';

export default {
  // 配置接口
  apis: [api_users],
  // 配置数据池
  db: { ...db_users },
  // 全局前置
  global: {
    prefix:'/mock'
  },
};
