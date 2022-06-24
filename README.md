<br>
<h1 align='center'>vite-plugin-free-mock</h1>
<p align='center'><em>Fast simulation of API data</em></p>
<p align='center'><a href="">Online sample</a></p>
<p align='center'>
<a href="https://www.npmjs.com/package/vite-plugin-free-mock">
<img src="https://img.shields.io/github/package-json/v/itmanyong/vite-plugin-free-mock?label=npm" alt="npm" />
</a>
<a href="https://github.com/itmanyong/vite-plugin-free-mock">
<img src="https://img.shields.io/github/package-json/v/itmanyong/vite-plugin-free-mock?label=github" alt="GitHub" />
</a>
</p>
<p align='center'>
<b>English</b> | <a href="https://github.com/itmanyong/vite-plugin-free-mock/blob/master/README.en.md">简体中文</a>
</p>

## features

- Fully regularized urls that can be easily customized with[regexparam](https://github.com/lukeed/regexparam)

- Customize the URL prefix/suffix, request type, delay simulation, and status code

- Custom virtual database with [mockjs](https://github.com/nuysoft/Mock/wiki/Getting-Started) to easily simulate database data

- Supports automatic parsing of query, Params, body, and headers parameters and automatic response parameters

- Log, global parameters, and module parameters have priority

- [mockjs](https://github.com/nuysoft/Mock/wiki/Getting-Started) is built in with full functionality

- Built-in multi-level request/response interceptor

- There are many different content-type send methods built in

- Fully controlled REQ/RES randomly assemble personalized demand responses

- The TypeScript support ~ ~

## Installation

pnpm User(recommended)

```bash
pnpm i vite-plugin-free-mock -D
```

yarn User

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

## Parameter Configuration Options [Complete detailed configuration]()

##### Plug-in top-level options---vitePluginFreeMockOptions

```bash
{
  # Interface module configuration array
  apis?: array;
  # Virtual database generation configurationG
  db?: object;
  # Global level default parameter
  global?: object;
  # Whether to enable the plug-in function in the development environment
  devMock?: boolean;
  # Check whether the plug-in function is enabled in the production environment
  prodMock?: boolean;
  # According to the request | log response
  logger?: boolean;
}
```

##### Interface module Options---apis

```bash
{

}

```

##### The interface options---apis/item

```bash
{

}

```

##### Virtual database options---db

```bash
{

}

```

##### Global default parameter options--global

```bash
{

}

```

## The sample

## plan

- API for automatically generating specifications from virtual databases (customizable specifications??)
- The completion list~~