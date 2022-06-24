/*
 * @Author: itmanyong itmanyong@gmail.com
 * @Date: 2022-06-22 21:58:49
 * @LastEditors: itmanyong itmanyong@gmail.com
 * @LastEditTime: 2022-06-24 14:53:29
 * @FilePath: \vite-plugin-api-mock\examples\demo-react\mock\database\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export default {
  // 用户数据池1
  users: new Array(15)
    .fill(0)
    .map((item, index) => ({ id: index + 1, name: `@cname`, email: '@email' })),
  // 用户数据池2
  users2: () => {
    return {
      'list|1-10': [
        { 'id|+1': 1, name: '@cname', 'avatar': '@image' },
      ],
    };
  },
  // 用户数据池3
  users3: ({mockjs}) => {
    return mockjs.mock({
      'list|1-50': [
        {
          'id|+1': 1,
          name: '@cname',
          avatar: mockjs.Random.image('200x100'),
        },
      ],
    }).list;
  },
};
