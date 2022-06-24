/*
 * @Author: itmanyong itmanyong@gmail.com
 * @Date: 2022-06-24 15:35:48
 * @LastEditors: itmanyong itmanyong@gmail.com
 * @LastEditTime: 2022-06-25 00:11:43
 * @FilePath: \vite-plugin-free-mock\src\utils\regexparam.ts
 * @Description: regexparam匹配库的辅助工具函数
 */
/**
 * 返回指定路径与匹配器的匹配参数对象
 * @param path 需要匹配的路径
 * @param result regexparam.parse返回的解析对象
 * @returns {key:value}
 */
export function execParams(
  path: string,
  result: {
    pattern: RegExp;
    keys: string[];
  }
) {
  let i = 0,
    out: { [key: string]: any } = {};
  let matches = result.pattern.exec(path);
  if (matches) {
    while (i < result.keys.length) {
      out[result.keys[i]] = matches[++i] || null;
    }
    return out;
  }
  return null;
}
