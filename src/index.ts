/*
 * @Author: itmanyong itmanyong@gmail.com
 * @Date: 2022-06-22 03:28:11
 * @LastEditors: itmanyong itmanyong@gmail.com
 * @LastEditTime: 2022-06-24 16:13:55
 * @FilePath: \vite-plugin-api-mock\src\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { OPTIONS_CONFIG, OPTIONS_RESULT, APIS_VIRTUAL_RESULT } from './types';
import { ResolvedConfig, ViteDevServer } from 'vite'
import { options_config } from './contans';
import { merge } from 'lodash';
import renderVirtualDatabase from './utils/renderVirtualDatabase';
import renderVirtualApi from './utils/renderVirtualApi'
import { createDevMockServer } from './createDevMockServer';


export default function vitePluginApiMock(options: OPTIONS_CONFIG = {}) {
  // 融合配置
  let _options = {} as OPTIONS_RESULT;
  // 生成数据池
  let _db = {};
  // 生成接口
  let _apis = {} as APIS_VIRTUAL_RESULT;
  // 是否生产
  let _isDev: boolean = false;
  // vite配置
  let _viteConfig: ResolvedConfig;
  return {
    name: 'vite:api-mock',
    enforce: 'pre',
    configResolved(resolvedConfig: ResolvedConfig) {
      _viteConfig = resolvedConfig;
      _isDev = _viteConfig.command === 'serve';
      _options = merge(options_config, options) as OPTIONS_RESULT;
      if (_options.devMock || _options.prodMock) {
        _db = renderVirtualDatabase(_options);
        _apis = renderVirtualApi(_options);
      }
    },
    async configureServer(server: ViteDevServer) {
      if (_options.devMock && _isDev) {
        const mockMiddleware = await createDevMockServer(_options, _db, _apis)

        server.middlewares.use(mockMiddleware)
      }
    },
  };
}
