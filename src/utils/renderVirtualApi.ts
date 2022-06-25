/*
 * @Author: itmanyong itmanyong@gmail.com
 * @Date: 2022-06-24 21:00:51
 * @LastEditors: itmanyong itmanyong@gmail.com
 * @LastEditTime: 2022-06-25 15:04:37
 * @FilePath: \vite-plugin-free-mock\src\utils\renderVirtualApi.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { OPTIONS_RESULT, APIS_VIRTUAL_RESULT, METHOD_TYPE } from '../types';
import { apis_virtual_result } from '../contans';
import { parse } from 'regexparam';
import { merge } from 'lodash';
export default (_options: OPTIONS_RESULT): APIS_VIRTUAL_RESULT => {
  const _apis = apis_virtual_result,
    { global, apis: apiModules } = _options;

  if (apiModules.length) {
    // 接口模块
    for (let mKey = 0, mLen = apiModules.length; mKey < mLen; mKey++) {
      const { apis = [], ...rest } = apiModules[mKey];
      // 接口列表
      for (let lKey = 0, lLen = apis.length; lKey < lLen; lKey++) {
        const api = apis[lKey];
        let url = `${global.prefix}${rest.prefix || ''}${api.url || ''}${
          'suffix' in rest ? rest.suffix : global.suffix
        }`;
        let method = (
          api.method ||
          rest.method ||
          global.method
        )?.toLowerCase() as METHOD_TYPE;
        let timeout = api.timeout || rest.timeout || global.timeout;
        let statusCode = api.statusCode || rest.statusCode || global.statusCode;
        let responseType =
          api.responseType || rest.responseType || global.responseType;
        let strict = api.strict || rest.strict || global.strict;
        let render = api.render || null;
        let pattern = api.pattern || null;
        let keys = api.keys || [];
        let meta = merge(global.meta || {}, rest.meta || {});
        let handlerRequest = rest.handlerRequest || undefined;
        let handlerResponse = rest.handlerResponse || undefined;
        if (url && !pattern) {
          const rules = parse(url);
          pattern = rules.pattern;
          keys = rules.keys || [];
        }
        const _api = {
          url,
          method,
          statusCode,
          pattern,
          keys,
          strict,
          timeout,
          render,
          meta,
          responseType,
          handlerRequest,
          handlerResponse,
          intercept: {
            global: null,
            module: null,
            api: null,
          },
        };
        _apis[method] ? _apis[method].push(_api) : (_apis[method] = [_api]);
      }
    }
  }

  return _apis;
};
