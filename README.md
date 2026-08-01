# 悦悦任务统筹台 · Yueyue Task Dashboard

一个**本地优先**的个人任务统筹台（HTML/CSS/JS），为悦悦设计，用来把回国后密集的待办清单变成可执行、可追踪、不会漏的日程体系。网易云「今日歌曲」功能叠加一个可选的 Netlify 无服务器函数做代理，其余完全离线可用。

灵感来自抖音「每日小票生成器」——把每天完成的正反馈收集 + 打印成一张复古热敏小票，哄自己每天起床上班 💤

---

## 功能 Features

- **多视图切换**
  - 今日待办：`每日必做`（打卡习惯）+ `今日限定`（当天专属待办）+ `子任务`
  - 💩 拉粑粑日历：按月记录，带连续天数 / 最佳纪录统计
  - 🧴 护肤日历：面膜 / 擦护肤品 / 去美容店 三类行为，可点日期编辑
  - 🧾 小票托盘：收藏每天生成的「每日小票」，卡片可拖动排序
- **每日小票生成器（Daily Receipt）**
  - 复古热敏小票视觉：`DAILY RECEIPT` / `Daily Receipt MM-DD` / 大日期块
  - 每天根据日期随机生成一幅 **像素风 dither 图**（Canvas + Bayer 抖动，8 种图案）
  - 「从打印机滚出来」开票动效 + 逐行打印 + 撕边
  - 汇总当天完成数据：每日必做 / 今日限定 / 子任务 / 护肤 / 拉粑粑 / 完成率
- **网易云「今日歌曲」（TODAY'S TRACK）**
  - 点顶部 🎵 填入你的**网易云 UID**（个人主页地址栏 `user?id=123456` 里的数字）
  - 每天从小票里随机抽一首你「喜欢的音乐」，封面转成**像素风**印在小票上
  - 按日期固定（同一天同一首，过零点换下一首），数据走你自己的无服务器函数，UID 只存本地
  - 需要把仓库以 **Git 方式连到 Netlify**（见下方「部署」），因为网易云接口有加密 + 跨域限制，纯拖拽部署跑不了函数
- **本地优先 + 可选云端同步**
  - 默认只存浏览器 `localStorage`，离线可用
  - 可选接入 Supabase 做多设备同步（详见 `SUPABASE_SETUP.md`）
- **数据可携带**：支持导入 / 导出 / 备份

---

## 技术栈

- 纯静态三件套：`index.html` + `style.css` + `app.js`
- `supabase.umd.js`：Supabase JS v2（仅用于可选的云端同步，不引入也能跑）
- `netlify/functions/ncm.js` + `ncm-cover.js`：网易云代理（weapi 抓取「我喜欢的音乐」+ 封面图 CORS 代理），**仅网易云功能需要**，且只在连了 Git 的 Netlify 上运行
- **无构建步骤**，打开即用

---

## 本地运行

直接双击 `index.html` 即可；或起一个静态服务器：

```bash
cd task-dashboard
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

---

## 部署（Netlify / 任意静态托管）

把整个目录作为 site root，Build command 留空，Publish directory 填 `.`。
更详细步骤见 `DEPLOY.md`。

> 例：Netlify 拖拽部署 → 选 `task-dashboard` 文件夹 → Deploy。

### ⚠️ 网易云「今日歌曲」必须走 Git 部署

网易云接口有加密（weapi）+ 浏览器跨域限制，纯前端抓不了，所以该功能依赖仓库里的 `netlify/functions/` 无服务器函数。**Netlify 拖拽部署（Drop）不支持函数**，必须改成把 GitHub 仓库连到 Netlify：

1. 打开 https://app.netlify.com → **Add new site → Import an existing project → GitHub**
2. 选 `xiaoyue0v0/yueyue-task-dashboard`
3. Build command 留空，Publish directory 填 `.`（仓库根 `netlify.toml` 已配好 `functions` 目录）
4. Deploy 后，🎵 填 UID 即可生效

> 不连 Git、只用 Drop 部署时，其余功能一切正常，「今日歌曲」区块会自动隐藏（无 UID / 无函数时不显示）。

---

## 云端同步设置

想在多台设备（手机 + 电脑）共享同一份数据，按 `SUPABASE_SETUP.md` 建一张 `sync` 表，然后在应用里输入同一个 **同步码（sync code）** 即可。同步码只存在于本地和你输入的对话框，**不会进仓库**。

---

## 版本与回退

- 本项目约定：**每个版本 = 一个独立 commit**，commit message 写明改了什么（形如 `v16: ...`）。
- 每个版本打一个 **git tag**（`v15`、`v16` …），方便回退。
- 回退到某个版本：
  ```bash
  git checkout v15        # 查看 v15 的代码
  # 或撤销某一次改动：
  git revert <commit>     # 生成一个新的反向 commit
  ```
- 当前仓库基线为 `v15`，此后每次「做一个版本」都会单独提交并打 tag，便于随时回退。

---

## 目录结构

| 文件 | 作用 |
|------|------|
| `index.html` | 页面结构 / 各视图容器 / 弹窗 |
| `style.css`  | 样式与全部动画（复古热敏风、打印动效、托盘拖拽） |
| `app.js`     | 全部逻辑（任务、日历、小票、像素图、同步、导入导出） |
| `supabase.umd.js` | Supabase 客户端（可选同步） |
| `DEPLOY.md` | 部署说明 |
| `SUPABASE_SETUP.md` | 云端同步建表与配置说明 |
| `netlify.toml` | Netlify 配置（发布目录 + 函数目录） |
| `netlify/functions/ncm.js` | 网易云「我喜欢的音乐」代理（weapi） |
| `netlify/functions/ncm-cover.js` | 网易云封面图 CORS 代理（供 Canvas 像素化） |
| `preview-*.png` | 各功能界面历史预览截图 |

---

## 隐私

- 数据默认只存你本地浏览器（`localStorage`），不经过任何第三方。
- 开启云端同步后，数据会经过**你自己的** Supabase 项目，密钥由你掌控。
- 网易云 **UID 只存在你本地浏览器**（`yueyue-ncm-uid`），不会进仓库；「今日歌曲」通过**你自己的** Netlify 函数去抓网易云公开数据，不依赖任何第三方中转到账。
- 不要把含真实任务数据的导出文件（`*.export.json`）提交进仓库。

---

## 已修复的历史 Bug（基线 v15 已含）

- 🧾 小票无法退出 → 加了 × 按钮 / 点背景关闭 / ESC 关闭
- 💩 拉粑粑刷新后消失 → 云端 pull 不再用陈旧数据覆盖本地未同步的修改（`_dirty` 守卫）

---

_这是悦悦的私人效率工具，按她的习惯持续迭代。_
