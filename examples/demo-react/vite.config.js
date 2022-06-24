/*
 * @Author: itmanyong itmanyong@gmail.com
 * @Date: 2022-06-22 21:36:31
 * @LastEditors: itmanyong itmanyong@gmail.com
 * @LastEditTime: 2022-06-24 14:52:45
 * @FilePath: \vite-plugin-api-mock\examples\demo-react\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// 导入vite-plugin-api-mock插件
import vitePluginApiMock from '../../dist/index';
// import vitePluginApiMock from 'vite-plugin-free-mock';
// 导入mock配置
import apiMockConfig from './mock/createMockServer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginApiMock(apiMockConfig)],
});
