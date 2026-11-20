# rochsen-homepage

基于 Vue 3 与 Vite 的个人主页。`src/main.ts` 把根组件挂到 `index.html` 的 `#app`，没有路由和服务端。页面由 `src/views/MainCard.vue` 组合头部、中部和页脚，站点数据来自 `src/data/`。

## 感谢

项目实现参考：[https://github.com/QNquenan/Simple-Homepage](https://github.com/QNquenan/Simple-Homepage)

当前项目为学习项目，用于扩充个人前端技术栈

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
├── public/                         # 构建后原样出现在 dist 根目录
│   ├── avatar.webp
│   ├── favicon.webp
│   └── registration.png            # 公安备案徽标
├── src/
│   ├── App.vue                     # 根组件，引入全局样式
│   ├── main.ts
│   ├── views/                      # Header、Center、Footer、MainCard
│   ├── components/                 # 介绍、计划、时光、打字机、联系方式
│   ├── utils/components/           # LinkBtn、Typewriter
│   ├── data/                       # config.ts 汇总各 JSON
│   └── styles/                     # App.css、config.css
├── pkg.py                          # 把 dist 打成带 dist 目录的 zip
├── index.html
├── vite.config.ts                  # @ 指向 src
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── package.json
```

`@` 在 `vite.config.ts` 和 `tsconfig.app.json` 中都指向 `src`，导入可以写成 `@/App.vue`。

## 开发规范

规范以仓库里的配置为准。

### 技术约定

- 使用 Vue 3 单文件组件，`<script setup lang="ts">`。现有组件的区块顺序是 script、template、style，样式使用 `scoped`。
- 组件 props 用 `defineProps` 的类型参数声明。
- 页面结构在 `src/views/`，卡片内容在 `src/components/`。`MainCard.vue` 用 `provide('ConfigData', ConfigData)` 把站点数据交给子组件。
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

`pnpm build` 先并行执行类型检查和 `vite build`，成功后再运行 `python pkg.py`，生成带 `dist/` 这一层目录的 `dist.zip`。`pnpm preview` 在本地用构建结果起一个静态服务器，用来确认上线内容。

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

## 提问与解法

下面按提问顺序整理。每节先写当时卡住的点，再写判断依据，最后给现在项目里采用的写法。

### 1. 文档要对照真实项目，不能按脚手架原文写

脚手架 README 仍写着「页面都在 `App.vue`」。仓库长大以后，入口、视图、数据和打包脚本都变了。写目录时打开仓库核对文件名，尤其是 Windows 不区分大小写、TypeScript 区分大小写这件事。

### 2. 把本地仓库推到 GitHub

本地还没有远程时，用已登录的 `gh` 创建公开仓库并推送，不要改 git 的用户名和邮箱配置。

```sh
git init -b main
git add .
git commit -m "chore: 初始化个人主页仓库"
gh repo create rochsen-homepage --public --source=. --remote=origin --push
```

`node_modules` 和编辑器私有配置留在 `.gitignore` 里，不要推进仓库。

### 3. CSS 怎样给 div 分列

一行里放两列，用 flex 或 grid 都可以。这个主页的中部用 grid，因为左右两列还要再拆成不等高的行。

```css
.row {
  display: flex;
}

.row > * {
  flex: 1;
}
```

```css
.columns {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
}
```

`1fr 2fr` 表示右列是左列的两倍。`gap` 是列间距，不要用外边距硬挤。

### 4. TypeScript 能不能拿到 IP，并判断省份

浏览器里的 TypeScript 编译后就是 JavaScript，读不到网卡，也没有「当前省份」这个内置 API。公网 IP 和省份都要问 IP 库，省份是库根据地址段推断的，不是精确定位。

```ts
const data = await fetch('https://ipwho.is/').then((res) => res.json())
// data.ip 是公网 IP，data.region 是省或州，data.country 是国家
```

页面上的「广东省」来自 `src/data` 里手写的配置，不是运行时算出来的。

### 5. 页脚链接不要套用全局 a 的悬停条

`src/styles/App.css` 给所有 `a` 画了一条主题色 `::before`。悬停时这条条的高度变成 `100%`，所以页脚链接也会铺满一块粉色。页脚组件的样式带 `scoped`，选择器比全局元素选择器更具体，可以在本组件里把这条条关掉。

```css
a {
  color: var(--text-color);

  &::before {
    background: none;
  }

  &:hover {
    color: var(--text-color);

    &::before {
      background: none;
      height: 2px;
    }
  }
}
```

联系方式按钮是 `<a class="linkBtn">`，同样会吃到这条全局条，看起来像按钮下面多了一道红线。按钮不需要这条装饰，直接去掉伪元素：

```css
.linkBtn::before,
.linkBtn:hover::before {
  content: none;
}
```

`content: none` 比只改颜色更干净，伪元素不会再占位置。

### 6. Grid 按列排还是按行排

默认 `grid-auto-flow: row`，格子先排满一行再换下一行。主页左右两半要先从上到下排完一列，所以改成按列流动，并用行高模板规定每一格占多少。

```css
.left-part {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 0.8fr 1fr;
}

.right-part {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 3fr 0.5fr 1.5fr;
}
```

`grid-auto-flow: column` 时，显式模板要写在 `grid-template-rows` 上。写在 `grid-template-columns` 上不会控制这一列里的上下比例。

### 7. 同一列里的格子怎样不等分

`fr` 是把剩余高度按数字比例切开，不是像素。`0.8fr 1fr` 表示上面占 0.8 份、下面占 1 份。右列 `3fr 0.5fr 1.5fr` 就是介绍最高、打字机最矮、联系方式居中。

比例想生效，父级必须有确定高度。`.center` 是 `height: 50vh`，左右两半再写 `height: 100%`。如果高度是 `auto`，`fr` 会退化成按内容撑开，两列底部就对不齐。

另外，格子的默认 `min-width` 是 `auto`，内容不换行时会把旁边的列挤扁。列宽写成 `minmax(0, 1fr)`，格子再加 `min-width: 0`，列才能缩到比内容更窄。

```css
.center {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  height: 50vh;
}

.left-part,
.right-part {
  height: 100%;
  min-width: 0;
}
```

### 8. 今年已过天数不能用 getFullYear

`getFullYear()` 返回的是年份，例如 2026，不是今年第几天。第几天用「现在」减去「今年 1 月 1 日 0 点」，再换成整天，最后加 1，因为当天也要算进去。

```ts
const now = new Date()
const yearStart = new Date(now.getFullYear(), 0, 1)
const yearDays = Math.floor((now.getTime() - yearStart.getTime()) / (24 * 60 * 60 * 1000)) + 1
```

`getTime()` 是毫秒。一天是 `24 * 60 * 60 * 1000` 毫秒。国内没有夏令时，这样整除是稳定的。

### 9. 本月总天数

没有 `getDaysInMonth()`。把日期设成「下个月的第 0 天」，会回退到本月最后一天，`getDate()` 就是本月天数。月份参数从 0 开始，`getMonth() + 1` 才是下个月。

```ts
const now = new Date()
const monthTotal = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
```

2 月会得到 28 或 29，不需要自己列一张月份表。

### 10. 闰年为什么是 new Date(year, 1, 29).getMonth() === 1

`new Date(year, monthIndex, day)` 的月份从 0 计，`1` 是二月。

- 闰年真有 2 月 29 日，对象停在二月，`getMonth()` 仍是 `1`，全年 366 天。
- 平年没有这一天，日期溢出到 3 月 1 日，`getMonth()` 变成 `2`，全年 365 天。

```ts
const yearTotal = new Date(now.getFullYear(), 1, 29).getMonth() === 1 ? 366 : 365
```

这是在问「2 月 29 日是否存在」，不是在取当前月份。

### 11. 时光卡片做成进度条

数字是分子，总天数或 24 小时是分母。外层是轨道，内层宽度用百分比，颜色用主题色。

```vue
<div class="time-item-track">
  <div
    class="time-item-progress"
    :style="{ width: `${(monthDays / monthTotal) * 100}%` }"
  ></div>
</div>
```

```css
.time-item-track {
  height: 8px;
  border-radius: 999px;
  overflow: hidden;
  background: color-mix(in srgb, var(--text-color) 12%, transparent);
}

.time-item-progress {
  height: 100%;
  background: var(--theme-color);
}
```

`weekDays` 用的是 `getDay()`。它把星期日当成 0，星期六是 6。这里表示的是「本周已过去的天数」，周日早上会显示 0。

### 12. Vite 红屏：v-for 多了一对括号

`v-for="(item in PlanList)"` 不是合法表达式。括号只在同时取出下标时使用，例如 `(item, index) in list`。只遍历数组时不要包括号。

```vue
<div v-for="item in PlanList" :key="item.detail"></div>
```

### 13. inject 的 ConfigData 隐式 any，还循环引用了自己

错误写法是 `inject<typeof ConfigData>('ConfigData')`。等号左边的 `ConfigData` 还没定义完，右边又用它做类型，TypeScript 无法推断。

做法是从数据模块另取一个名字，再把它当作 `inject` 的默认值。这样类型从导入来，不从正在声明的变量来。

```ts
import { ConfigData as siteConfig } from '@/data/config'

const ConfigData = inject('ConfigData', siteConfig)
```

`provide` 在 `MainCard.vue`，子组件用同一个字符串 `'ConfigData'` 取出。

### 14. Cursor 里输入 v3 能不能生成 Vue 模板

编辑器本身没有这个片段。安装扩展 Vue 3 Snippets 后，空的 `.vue` 文件里输入 `v3` 或 `vbase` 可以展开模板。Vue 官方扩展只提供语法支持，不提供 `vue3` 这个前缀。也可以在用户代码片段里自己建一条，把 prefix 设成 `vue3`。

### 15. solid 改成断线

`solid` 是实线，断线是 `dashed`。计划条目的底边改在说明文字上，不要画在整行容器上，这样虚线长度跟文字走。

```css
.plan-item-detail {
  border-bottom: 2px dashed var(--text-color);
}
```

### 16. 计划清单在卡片里滚动

滚动要加在整份清单上。加在每一行上时，单行高度到不了上限，滚动条不会出现。父级还得是 flex 列，并且 `min-height: 0`，否则子元素的默认最小高度是内容高度，`overflow` 不生效。

```css
.card-scroll {
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}

.card-scroll .card-content {
  flex: 1;
  min-height: 0;
}

.plan-list {
  height: 100%;
  overflow-y: auto;
}
```

### 17. 找不到 contactBlock.vue 的声明文件

`<script setup>` 没有 `lang="ts"` 时，这个 SFC 对 TypeScript 来说是隐式 `any` 模块，导入它就会报「无法找到声明文件」。脚本里即使暂时没有类型标注，也要写上语言。

```vue
<script setup lang="ts"></script>
```

`Typewriter.vue` 是同一类问题，并且导入路径必须和磁盘上的文件名一致。文件是 `Typewriter.vue` 时，不要写成 `typewriter.vue`。Windows 资源管理器不区分大小写，`vue-tsc` 区分。

`LinkBtn.vue` 同理：`contactBlock.vue` 里要写 `@/utils/components/LinkBtn.vue`，不能写成 `linkBtn.vue`。

Iconify 的 `icon` 属性要字符串。可选 prop 可能是 `undefined`，模板里交给组件前补成空字符串：

```vue
<Icon :icon="icon || ''" />
```

### 18. 打字机在卡片里水平垂直居中

父卡片已经 `height: 100%`。子元素也要撑满这块高度，再用 flex 的两个居中属性。只写 `margin: auto` 时，父级高度如果没传下来，垂直方向没有空余空间可分。

```css
.typewriter-block {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-width: 0;
}
```

### 19. Iconify 图标名写错会是空白

`<Icon icon="前缀:名称" />` 会向 Iconify 请求这个 id。id 不存在就返回 404，页面上是空盒子。名称要换成该集合里真实存在的 id，例如：

```json
{ "icon": "logos:linux-tux", "name": "Linux" }
{ "icon": "logos:pandas-icon", "name": "Pandas" }
{ "icon": "material-icon-theme:pytorch", "name": "Pytorch" }
{ "icon": "logos:fastapi-icon", "name": "FastAPI" }
```

`vscode-icons:file-type-linux` 这类名字当时是无效的。改完后图标应渲染成 40×40 的 SVG。

### 20. Vite 报 JSON 行尾多余逗号

JSON 不允许最后一个元素后面再加逗号。`src/data/*.json` 里如果写成下面这样，Vite 会在解析阶段直接失败：

```json
["第一句", "第二句"]
```

删掉 `]` 前面的那个逗号。多个数据文件有的只是大小写不同（`typewriter.json` 和 `typeWriter.json`），导入路径要和 `config.ts` 里的真实文件名一致。

### 21. 介绍里的几段文字在卡片内垂直均匀分布

`justify-content: space-evenly` 只分配父级里多出来的空间。父级高度是 `auto` 时，没有多余空间，几段会贴在一起。父级先占满卡片，段落自身的外边距清掉，否则外边距和均匀分布会叠在一起。

```css
.Intro-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
}

.Intro-container p,
.Intro-container h3 {
  margin: 0;
}
```

### 22. 名字的扫光做不出来

扫光用的是 `::before` 的 `content: attr(data-text)`，再用宽度动画从 0 涨到文字宽度。两样缺一不可：

- 元素上要有 `:data-text="ConfigData.name"`。没有这个属性，`attr(data-text)` 是空的，彩色层没有字。
- `.name` 要 `display: inline-block`。行内元素的宽度动画无法把溢出裁切成扫光。

```vue
<span class="name" :data-text="ConfigData.name">{{ ConfigData.name }}</span>
```

```css
.name {
  position: relative;
  display: inline-block;
}

.name::before {
  content: attr(data-text);
  position: absolute;
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  color: var(--theme-color);
  animation: showName 3s ease-in-out infinite;
}

@keyframes showName {
  0% {
    width: 0;
  }
  50% {
    width: 105%;
  }
  100% {
    width: 0;
  }
}
```

全局 `* { transition: all 0.3s }` 作用不到伪元素上的 `content`，扫光仍然靠 `@keyframes`。

### 23. 整页响应式，以及随后四条样式回退

窄屏不能只把字号改小。技术栈和联系按钮原来不换行，最小内容宽度有六百多像素，会把 `1fr` 那一列挤成一条缝。

处理原则：

- 列用 `minmax(0, 1fr)`，子项 `min-width: 0`，允许缩到内容宽度以下。
- 768px 以下，中部改成一列。左右两块用同样的行高，避免一边被内容撑高、另一边很矮。

```css
@media (max-width: 768px) {
  .center {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(22rem, 50vh) minmax(22rem, 50vh);
    height: auto;
  }

  .left-part,
  .right-part {
    height: 100%;
  }
}
```

四条回退分别是：

1. 技术栈保持一行。小屏不要 `flex-wrap: wrap`，改成不换行并横向滚动。图标 `flex-shrink: 0`，否则会被压扁。

```css
.tech-stack-items {
  flex-wrap: nowrap;
  overflow-x: auto;
}

.tech-stack-item {
  flex-shrink: 0;
}
```

2. 左右高度重新对齐。见上面的 `height: 100%` 和窄屏下两行相同的 `minmax`。`min-height: 0` 曾经让 `fr` 行按内容收缩，左列底部会短一截。
3. 小屏介绍太挤。卡片变矮后 `space-evenly` 分不出空隙，要补 `gap`、行高和左右内边距。

```css
@media (max-width: 768px) {
  .Intro-container {
    gap: 0.65rem;
    padding: 0.75rem 0.25rem;
  }

  .Intro-container p,
  .Intro-container h3 {
    line-height: 1.7;
  }
}
```

4. 联系按钮不要剩一个单独掉到下一行。窄屏改成两列网格。当时还把按钮缩短、图标缩小，四个按钮正好两行。这一步后来把按钮拉变形了，尺寸已改回，见第 31 节。

```css
@media (max-width: 768px) {
  .contact-block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem 0.75rem;
  }

  .linkBtn {
    width: 100%;
    height: 34px;
    font-size: 0.85rem;
  }
}
```

页脚在窄屏会挡住最后一张卡片，所以 `main` 在 768px 以下加大 `padding-bottom`。

### 24. 小屏页脚徽标掉到第二行

公安徽标和两行备案是一个 `inline-flex`，并且 `align-items: flex-end`。宽屏两行文字并排，徽标贴在底部没问题。窄屏文字改成上下两行后，底部对齐会把徽标放到 ICP 那一行。

窄屏改成网格，并用 `display: contents` 让两个链接直接参加外层网格。徽标锁在第一行第一列，公网安备在它右边，ICP 单独占第二行并居中。

```css
@media (max-width: 768px) {
  .footer-line {
    display: inline-grid;
    grid-template-columns: auto auto;
    align-items: center;
  }

  .registration-img-container {
    grid-row: 1;
    grid-column: 1;
  }

  .footer-line-text {
    display: contents;
  }

  .footer-line-text a:first-child {
    grid-row: 1;
    grid-column: 2;
  }

  .footer-line-text a:last-child {
    grid-row: 2;
    grid-column: 1 / -1;
    justify-self: center;
  }
}
```

### 25. 技术栈图标悬停时显示 name

图标的父级有 `overflow-x: auto`。CSS 里用绝对定位做的气泡会被这个滚动容器裁掉。气泡用 `Teleport` 送到 `body`，再用 `position: fixed` 放到图标上方。滚动图标行时把提示关掉，避免它停在旧坐标上。

```vue
<div class="tech-stack-item" @mouseenter="showTip($event, item.name)" @mouseleave="hideTip">
  <Icon :icon="item.icon" width="40" height="40" />
</div>
<Teleport to="body">
  <div v-show="tip.visible" class="tech-tip" :style="{ left: `${tip.x}px`, top: `${tip.y}px` }">
    {{ tip.text }}
  </div>
</Teleport>
```

```ts
function showTip(event: MouseEvent, name: string) {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  tip.text = name
  tip.x = rect.left + rect.width / 2
  tip.y = rect.top
  tip.visible = true
}
```

```css
.tech-tip {
  position: fixed;
  transform: translate(-50%, calc(-100% - 8px));
  pointer-events: none;
}
```

不要同时加原生 `title`，否则会先出自定义提示，过一会儿再出浏览器自己的提示。

### 26. 小屏打字机上方的黑点

那不是文字里的点，是两侧 14 像素的引号图标。容器当时 `flex-wrap: wrap`，打字机又 `max-width: 100%`，文字独占一行，两个引号被挤到上一行。14 像素的引号看起来就是黑点。

引号不要换行，也不要被 flex 压扁。长句子只在两个引号中间折行。

```css
.typewriter-block {
  flex-wrap: nowrap;
}

.typewriter-block svg {
  flex-shrink: 0;
}

.typewriter {
  min-width: 0;
  max-width: calc(100% - 3rem);
}
```

### 27. zip 里要带一层 dist

`shutil.make_archive(目标名, 'zip', './dist')` 压缩的是目录里面的文件，解压后 `index.html` 直接落在当前目录。要保留 `dist` 这一层，就把归档根设为项目目录，再指定只收 `dist`。

```python
shutil.make_archive("./dist", "zip", root_dir=".", base_dir="dist")
```

解压结构是 `dist/index.html`、`dist/assets/`。

### 28. 把 python pkg.py 放进 pnpm build

`package.json` 的脚本是用 cmd 执行的，可以串命令。但 `pkg.py` 里如果再调用 `pnpm run build`，两边会互相调用。所以构建和压缩拆开：`build` 先完成页面，再调用只负责压缩的脚本。

```json
{
  "build": "run-s \"build:app {@}\" pkg --",
  "build:app": "run-p type-check \"build-only {@}\" --",
  "pkg": "python pkg.py"
}
```

`run-p` 是并行，类型检查和 Vite 一起跑。`run-s` 是串行，压缩一定发生在构建成功之后。`{@}` 把额外参数只传给 Vite，不传给类型检查。

### 29. 为什么压缩脚本里不再删除 dist

原来的顺序是：删掉旧 `dist`，再 `pnpm run build`，最后压缩。删除发生在重新构建之前，清的是上一次的产物。

现在的顺序是：`build:app` 先写出新的 `dist`，然后才执行 `pkg.py`。压缩脚本如果还在开头 `rmtree("./dist")`，刚构建的文件会被删掉，zip 没有内容。旧的 `dist.zip` 仍然要先删，否则可能把上次的压缩包留在旁边。清目录这件事如果还需要，应放在 `vite build` 之前，不能放在压缩之前。

```python
if os.path.exists("./dist.zip"):
    os.remove("./dist.zip")

shutil.make_archive("./dist", "zip", root_dir=".", base_dir="dist")
```

### 30. 小屏先显示右半边，再显示左半边

窄屏中部是一列，格子按 DOM 顺序排。`Center.vue` 里左半边写在前面，所以计划和时间会先出现，介绍在下面。宽屏仍然要左列在左、右列在右，不能改 HTML 顺序。

只在 768px 以下用 `order` 调整显示顺序。数字小的排在前面。右半边设为 1，左半边设为 2。宽屏不进入这个媒体查询，两边的 `order` 都是默认的 0，仍然并排。

```css
@media (max-width: 768px) {
  .right-part {
    order: 1;
  }

  .left-part {
    order: 2;
  }
}
```

### 31. 小屏联系按钮不要被拉变形

第 23 节为了塞进两列，给按钮加了 `width: 100%`，并把高度改成 34px、字号改成 0.85rem、图标改成 20px。网格默认 `justify-items: stretch`，按钮被拉成整格宽的扁条，和原来的胶囊按钮不一样。

按钮尺寸收回原来的写法：高 40px、字号 18px、圆角 16px、图标 36px，宽度跟着内容走。两列排列留着，格子改成居中，不再把按钮拉满。

```css
.linkBtn {
  height: 40px;
  font-size: 18px;
  border-radius: 16px;
  padding: 0.5rem 0.7rem;
}

@media (max-width: 768px) {
  .contact-block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    align-items: center;
    gap: 0.35rem 0.5rem;
  }
}
```

`height: 40px` 没有改 `box-sizing`，上下 padding 会加在高度外面，画出来大约是 56px。这和宽屏是同一套尺寸。320px 宽时「哔哩哔哩」仍能放进右下格，不用再缩小图标。
