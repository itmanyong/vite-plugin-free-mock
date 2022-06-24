/*
 * @Author: itmanyong itmanyong@gmail.com
 * @Date: 2022-06-22 03:28:11
 * @LastEditors: itmanyong itmanyong@gmail.com
 * @LastEditTime: 2022-06-25 00:11:22
 * @FilePath: \vite-plugin-api-mock\src\index.ts
 * @Description:
 */
import { OPTIONS_CONFIG, OPTIONS_RESULT, APIS_VIRTUAL_RESULT } from './types';
import { ResolvedConfig, ViteDevServer } from 'vite';
import { options_config } from './contans';
import { merge } from 'lodash';
import renderVirtualDatabase from './utils/renderVirtualDatabase';
import renderVirtualApi from './utils/renderVirtualApi';
import { createDevMockServer } from './createDevMockServer';

export default function vitePluginApiMock(options: OPTIONS_CONFIG = {}) {
  // merge options
  let _options = {} as OPTIONS_RESULT;
  // render db
  let _db = {};
  // render apis
  let _apis = {} as APIS_VIRTUAL_RESULT;
  // isDevelopment
  let _isDev: boolean = false;
  // vite config
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
        const mockMiddleware = await createDevMockServer(_options, _db, _apis);
        server.middlewares.use(mockMiddleware);
      }
    },
  };
}
