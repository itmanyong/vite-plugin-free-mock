<br>
<h1 align='center'>vite-plugin-free-mock</h1>
<p align='center'><em>快速的 模拟 API 数据</em></p>
<p align='center'><a href="">在线 示例</a></p>
<p align='center'>
<a href="https://www.npmjs.com/package/vite-plugin-free-mock">
<img src="https://img.shields.io/github/package-json/v/itmanyong/vite-plugin-free-mock?label=npm" alt="npm" />
</a>
<a href="https://github.com/itmanyong/vite-plugin-free-mock">
<img src="https://img.shields.io/github/package-json/v/itmanyong/vite-plugin-free-mock?label=github" alt="GitHub" />
</a>
</p>
<p align='center'>
<a href="https://github.com/itmanyong/vite-plugin-free-mock/blob/master/README.md">English</a> | <b>简体中文</b>
</p>

## 特性

- 完全正则化的 URL,借助[regexparam](https://github.com/lukeed/regexparam)轻松定制各类 URL 需求

- 自定义 URL 前缀/后缀、请求类型、延时模拟、状态码

- 自定义虚拟数据库,搭载 [mockjs](https://github.com/nuysoft/Mock/wiki/Getting-Started) 轻松模拟数据库数据

- 支持 query、params、body、headers 等参数自动解析,自动化响应参数

- 日志、全局参数、模块参数多级别优先配置

- 内置 [mockjs](https://github.com/nuysoft/Mock/wiki/Getting-Started) 全部功能

- 内置多级别请求/响应拦截器

- 内置多种不同 content-type 类型 send 方法

- 完全控制的 req/res 随意组装个性化需求响应

- TypeScript 支持~~

## 安装

pnpm 用户(推荐)

```bash
pnpm i vite-plugin-free-mock -D
```

yarn 用户

```bash
pnpm add vite-plugin-free-mock -D
```

## 配置

```bash
# vite.config.js
import { defineConfig } from 'vite';
# 导入插件
import vitePluginApiMock from 'vite-plugin-free-mock';
# 导入插件配置
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

## 参数配置选项 [完整详细配置]()

##### 插件顶层选项---vitePluginFreeMockOptions

```bash
{
  # 接口模块配置数组
  apis?: array;
  # 虚拟数据库生成配置
  db?: object;
  # 全局级别默认参数
  global?: object;
  # 开发环境是否开启插件功能
  devMock?: boolean;
  # 生产环境是否开启插件功能
  prodMock?: boolean;
  # 显示请求|响应日志
  logger?: boolean;
}
```

##### 接口模块选项---apis

```bash
{

}

```

##### 接口选项---apis/item

```bash
{

}

```

##### 虚拟数据库选项---db

```bash
{

}

```

##### 全局默认参数选项--global

```bash
{

}

```

## 示例

## 计划

- 根据虚拟数据库自动生成规范的 API(可定制规范???)
- 补全单测~~
