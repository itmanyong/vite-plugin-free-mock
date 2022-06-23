<!--
 * @Author: itmanyong itmanyong@gmail.com
 * @Date: 2022-06-22 03:56:32
 * @LastEditors: itmanyong itmanyong@gmail.com
 * @LastEditTime: 2022-06-22 04:10:19
 * @FilePath: \vite-plugin-api-mock\docs\design.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
- URL 支持字符串、正则、query 参数、路径参数、动态参数可忽略、后缀
- method 类型支持全部，格外新增 all 类型(表示只要匹配 url 类型可不管)
- timeout 可设置延时时间(支持函数动态生成)
- code 可设置返回状态码(支持函数动态生成)
- response 需要返回，接收参数为:第一个={req,res,query,params,body,env}，第二个=database
- 全局可配置 URL 前缀/后缀、超时、默认请求类型、默认状态码。(全部配置支持函数返回结果)
- 支持配置数据库、自动生成各种 URL、支持工厂函数生成请求
- 内置 mockjs 生成规则
- 支持请求不同的 Content-Type 解析
- 支持外部传入数据统筹到全局定义为 env
- @desc URL 匹配库
- regexparam---https://github.com/lukeed/regexparam
- Path-to-RegExp---https://github.com/pillarjs/path-to-regexp
