/*
 * @Author: itmanyong itmanyong@gmail.com
 * @Date: 2022-06-22 21:56:49
 * @LastEditors: itmanyong itmanyong@gmail.com
 * @LastEditTime: 2022-06-24 00:57:31
 * @FilePath: \vite-plugin-api-mock\examples\demo-react\mock\apis\users.js
 * @Description:
 * 1.直接导出接口配置对象
 */

export default {
  prefix: '/user',
  suffix: '',
  method: 'get',
  timeout: 1024 * 3,
  statusCode: 200,
  meta: {
    table: 'user',
  },
  apis: [
    // 查
    {
      url: '/get',
      response({ req, res, query, params, body }, db) {
        res.send(db.users)
      },
    },
    // 删
    {
      url: '/delete/:id',
      method: 'delete',
      response(ctx) {
        console.log('/mock/user/delete/:id\n', ctx);
      },
    },
    // 改
    {
      url: '/update/:id',
      method: 'put',
      response(ctx) {
        console.log('/mock/user/update/:id\n', ctx);
      },
    },
    // 增
    {
      url: '/post/add',
      method: 'post',
      response({ req, res, query, params, body }, db) {
        // console.log('/mock/user/post/:id\n', ctx);
        res.send({ name: '656666666' });
      },
    },
    /**
     * 测试render函数
     * 1.默认不支持send方法
     * 2.预计内部提供各类send方法
     * 测试状态:ok
     */
    {
      url:'/test/render',
      method:'post',
      render({ req, res, query, params, body }, db){
        res.end('6666')
      }
    }
  ],
};
