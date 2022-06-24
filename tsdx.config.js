/*
 * @Author: itmanyong itmanyong@gmail.com
 * @Date: 2022-06-25 00:39:43
 * @LastEditors: itmanyong itmanyong@gmail.com
 * @LastEditTime: 2022-06-25 01:06:40
 * @FilePath: \vite-plugin-free-mock\tsdx.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { terser } = require('rollup-plugin-terser');
module.exports = {
  rollup(config, options) {
    options.minify = true;
    config.plugins.push(terser());
    return config;
  },
};
