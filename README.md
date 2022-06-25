<br>
<p align='center'>
[![](https://files.catbox.moe/n3j1k5.png)](https://github.com/itmanyong/vite-plugin-free-mock)
</p>
<h1 align='center'>VITE-PLUGIN-FREE-MOCK</h1>
<p align='center'><em>快速的 模拟 API 数据</em></p>
<p align='center'><a href="">在线 示例</a></p>
<p align='center'><a href="https://www.npmjs.com/package/vite-plugin-free-mock"><img src="https://img.shields.io/github/package-json/v/itmanyong/vite-plugin-free-mock?label=npm" alt="npm" /></a> <a href="https://github.com/itmanyong/vite-plugin-free-mock"><img src="https://img.shields.io/github/package-json/v/itmanyong/vite-plugin-free-mock?label=github" alt="GitHub" /></a>
</p><p align='center'><b>简体中文</b>
</p>

## ⛲ 特性

- 🌴 完全正则化的 URL,借助[regexparam](https://github.com/lukeed/regexparam)轻松定制各类 URL 需求

- 🌱 自定义 URL 前缀/后缀、请求类型、延时模拟、状态码

- 🍊 自定义虚拟数据库,搭载 [mockjs](https://github.com/nuysoft/Mock/wiki/Getting-Started) 轻松模拟数据库数据

- 🍖 支持 query、params、body、headers 等参数自动解析,自动化响应参数

- 🌊 日志、全局参数、模块参数多级别优先配置

- ✨ 内置 [mockjs](https://github.com/nuysoft/Mock/wiki/Getting-Started) 全部功能

- 🍜 内置多级别请求/响应拦截器

- 🥤 内置多种不同 content-type 类型 send 方法

- 🌿 完全控制的 req/res 随意组装个性化需求响应

- ♨️ TypeScript 支持~~

## 🏋️ 安装

pnpm 用户(推荐)

```bash
pnpm i vite-plugin-free-mock -D
```

yarn 用户

```bash
pnpm add vite-plugin-free-mock -D
```

## 💎 插件配置

```bash
# vite.config.js
import { defineConfig } from 'vite';
# 导入插件
import vitePluginApiMock from 'vite-plugin-free-mock';
# 导入插件配置(根据你的配置)
import pluginConfig from './mock/createFreeMock'
export default defineConfig({
    plugins:[
        # 配置到插件列表中(顺序无关)
        vitePluginApiMock(pluginConfig),
        # ...otherPlugins,
    ],
    # ...otherViteConfig
})
```

## ⛷️ 参数定义

- ##### 插件顶层选项---vitePluginFreeMockOptions

```bash
{
  # 接口模块配置数组
  apis?: array,
  # 虚拟数据库生成配置
  db?: object,
  # 全局级别默认参数
  global?: object,
  # 开发环境是否开启插件功能
  devMock?: boolean,
  # 生产环境是否开启插件功能
  prodMock?: boolean,
  # 显示请求|响应日志
  logger?: boolean,
}
```

- ##### 接口模块选项---apis/item

```bash
{
  # 前缀,位于全局前缀后面 -> global.prefix + module.prefix
  prefix?: string,
  # 后缀,若存在全局suffix不生效
  suffix?: string,
  # 接口类型,若存在全局method不生效
  method?: get|post|put|patch|delete|options|head|trace,
  # 延时毫秒,若存在全局timeout不生效
  timeout?: number,
  # 状态码,若存在全局statusCode不生效
  statusCode?: number,
  # 严格模式,若存在全局strict不生效
  strict?: boolean,
  # 自定义参数对象,与全局meta会进行merge
  meta?: object,
  # 返回数据格式,若存在全局responseType不生效
  responseType?: html|text|xml|jpeg|gif|png|formData|xhtml|dataXml|atomXml|json|pdf|word|stream|form,
  # 模块级别请求拦截,全局请求拦截后触发,api = 当前触发接口
  handlerRequest?:  (ctx, api, _options) => any,
  # 模块级别响应拦截,全局响应拦截前触发,api = 当前触发接口
  handlerResponse?:  (ctx, api, _options) => any,
  # 模块接口配置
  apis?:array,
}

```

- ##### 接口选项---apis/item

```bash
{
  # 接口URL,使用regexparam解析,自动生成pattern
  url?: string,
  # 接口URL正则,显式设置则url无效
  pattern?: RegExp,
  # 接口路径参数params的字段名称集,根据url自动生成,设置pattern也可不配置
  keys?: string[],
  # 接口类型,优先级最高
  method?: get|post|put|patch|delete|options|head|trace,
  # 延时毫秒,优先级最高
  timeout?: number,
  # 状态码,优先级最高
  statusCode?: number,
  # 严格模式,优先级最高
  strict?: boolean,
  # 返回数据格式,优先级最高
  responseType?: html|text|xml|jpeg|gif|png|formData|xhtml|dataXml|atomXml|json|pdf|word|stream|form,
  # 接口response返回函数,ctx = 内部方法,包含req,res等,db = 虚拟数据数据,_options = 最终的插件配置
  render?: (ctx, db, _options) => void,
}

```

- ##### 虚拟数据库选项---db

```bash
{
  # 第一种：直接设置值
  keyName:object|any[],
  # 第二种：通过函数返回值
  keyName:({mockjs})=>any[]|object
  # tips
  # 返回的数据值都会被mockjs.mock()进行处理一次
}

```

- ##### 全局默认参数选项--global

```bash
{
  # 全局前缀,默认''
  prefix?: string,
  # 全局后缀,默认'',
  suffix?: string,
  # 全局请求类型,默认get
  method?: get|post|put|patch|delete|options|head|trace,
  # 全局延时毫秒,默认1024*1
  timeout?: number,
  # 全局状态码,默认200
  statusCode?: number,
  # 严格模式,默认false
  strict?: boolean,
  # 全局自定义参数对象,默认null
  meta?: object,
  # 全局返回数据类型,默认json
  responseType?: html|text|xml|jpeg|gif|png|formData|xhtml|dataXml|atomXml|json|pdf|word|stream|form,
  # 全局请求拦截,最先触发,api = 当前触发接口
  handlerRequest?:  (ctx, api, _options) => any,
  # 全局响应拦截,最后触发触发,api = 当前触发接口
  handlerResponse?:  (ctx, api, _options) => any,
}

```
## 👀 使用

## 🗜️ 案例

### [react-demo](https://github.com/itmanyong/vite-plugin-free-mock/tree/master/examples/demo-react)

## 📅 计划

- 根据虚拟数据库自动生成规范的 API(可定制规范???)
- 生产环境支持???
- 补全单测~~
