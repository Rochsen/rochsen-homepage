# rochsen-homepage

基于 Vue 3 与 Vite 的个人主页。当前是单页应用：`src/main.ts` 把根组件挂到 `index.html` 的 `#app`，没有路由和服务端。页面内容在 `src/App.vue`。

## 环境

- Node.js `^22.18.0` 或 `>=24.12.0`（见 `package.json` 的 `engines`）
- pnpm（锁文件为 `pnpm-lock.yaml`）

```sh
pnpm install
pnpm dev
```

开发服务器默认地址为 `http://localhost:5173`。

## 目录结构

```text
.
├── public/                  # 不经过打包的静态文件，构建后原样出现在 dist 根目录
│   ├── avatar.webp          # 头像
│   ├── favicon.ico
│   └── registration.png     # 备案图
├── src/
│   ├── App.vue              # 根组件，页面内容写在这里
│   └── main.ts              # 入口，创建应用并挂到 #app
├── .vscode/
│   ├── extensions.json      # 推荐扩展
│   └── settings.json        # 保存时用 Oxc 格式化
├── index.html               # HTML 模板，脚本入口为 /src/main.ts
├── env.d.ts                 # Vite 客户端类型
├── vite.config.ts           # Vite 配置，@ 指向 src，并启用 Vue DevTools
├── tsconfig.json            # TypeScript 工程引用入口
├── tsconfig.app.json        # 浏览器端（src）类型检查
├── tsconfig.node.json       # Node 工具链（vite、eslint 配置）类型检查
├── eslint.config.ts         # ESLint
├── .oxlintrc.json           # Oxlint
├── .oxfmtrc.json            # Oxfmt
├── .editorconfig
├── .gitattributes           # 文本文件统一使用 LF
├── .gitignore
├── .cursorrules             # 提交信息规范
├── pnpm-lock.yaml
└── package.json
```

`@` 在 `vite.config.ts` 和 `tsconfig.app.json` 中都指向 `src`，导入可以写成 `@/App.vue`。

## 开发规范

规范以仓库里的配置为准。

### 技术约定

- 使用 Vue 3 单文件组件，`<script setup lang="ts">`。现有组件的区块顺序是 script、template、style，样式使用 `scoped`。
- 组件 props 用 `defineProps` 的类型参数声明。
- 页面写在 `src/App.vue`。`src/main.ts` 创建应用并挂载到 `#app`。
- 需要随站点原样提供的文件放 `public/`，在代码里用根路径引用（例如 `/favicon.ico`、`/avatar.webp`）。

### 提交

提交信息使用中文，并遵守 Conventional Commits。类型、长度和写法见 `.cursorrules`。

### 格式

`.editorconfig` 与 `.oxfmtrc.json`：

- 编码 UTF-8，换行 LF，文件末尾保留空行，去掉行尾空格
- 缩进 2 个空格，行宽 100
- 使用单引号，语句不加分号

格式化只处理 `src/`：

```sh
pnpm format
```

编辑器推荐保存时用 Oxc 格式化，并执行 `source.fixAll`。推荐扩展见 `.vscode/extensions.json`：Vue (Official)、ESLint、EditorConfig、Oxc。

### 检查

`pnpm lint` 依次执行：

1. `oxlint . --fix`：启用 eslint、typescript、unicorn、oxc、vue 插件，`correctness` 为 error
2. `eslint . --fix --cache`：Vue essential + TypeScript recommended；格式问题交给 Oxfmt，ESLint 不再处理

类型检查使用 `vue-tsc --build`。`tsconfig.app.json` 打开了 `noUncheckedIndexedAccess`。`pnpm build` 会先做类型检查，类型错误时不会产出 `dist`。

```sh
pnpm type-check
pnpm lint
```

## 部署

这是纯静态站点。构建产物在 `dist/`，该目录已写入 `.gitignore`，不要提交。

```sh
pnpm install
pnpm build
pnpm preview
```

`pnpm build` 先跑 `vue-tsc --build`，再执行 `vite build`。`pnpm preview` 在本地用构建结果起一个静态服务器，用来确认上线内容。

把 `dist/` 整目录交给任意静态托管即可，站点根路径对应 `dist/index.html`。`public/` 中的文件会出现在 `dist` 根目录，打包后的脚本和样式在 `dist/assets/`，文件名带内容哈希。

当前没有客户端路由。若以后加上 Vue Router 的 history 模式，静态服务器需要把未知路径回退到 `index.html`。

默认 `base` 是 `/`。站点挂在子路径时，在 `vite.config.ts` 中设置 `base`，然后重新构建。例如挂在 `https://example.com/home/`：

```ts
export default defineConfig({
  base: '/home/',
  // ...其余配置保持不变
})
```

Nginx 可按静态目录发布（路径按实际机器修改）：

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/rochsen-homepage;
    index index.html;
}
```

上传前在本机执行 `pnpm preview`，确认页面、图标和样式都来自 `dist`。
