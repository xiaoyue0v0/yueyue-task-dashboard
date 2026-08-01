# 悦悦回国任务台 - 部署指南

## 方案一：局域网临时访问（最快，无需上传）

当前本地服务器已在运行：
- 电脑访问：http://localhost:8080
- 手机/同 WiFi 访问：http://192.168.0.103:8080

**注意**：只要关闭电脑或退出终端，这个地址就无法访问。

---

## 方案二：Netlify Drop（推荐，最简单）

1. 打开 https://app.netlify.com/drop
2. 把 `task-dashboard` 这个文件夹整体拖进网页
3. 等待几秒，Netlify 会自动分配一个 https 链接
4. 手机浏览器打开该链接即可使用

**优点**：免费、自动 HTTPS、全球 CDN、支持自定义域名。

---

## 方案三：GitHub Pages（免费且稳定）

1. 在 GitHub 新建一个公开仓库，例如 `yueyue-task-dashboard`
2. 把 `task-dashboard` 文件夹里的所有文件上传到仓库根目录
3. 进入仓库 Settings → Pages
4. Source 选择 Deploy from a branch，Branch 选择 main / root
5. 保存后会得到一个 `https://你的用户名.github.io/仓库名` 的链接
6. 手机浏览器打开即可

**优点**：完全免费、稳定、可绑定自己的域名。

---

## 方案四：Vercel

1. 打开 https://vercel.com/new
2. 导入 GitHub 仓库（需先把代码传上 GitHub）
3. 直接部署，Vercel 会自动生成访问链接

**优点**：速度快、自动 HTTPS、国内访问比 GitHub Pages 稍好。

---

## 方案五：Cloudflare Pages

1. 打开 https://dash.cloudflare.com/
2. 进入 Pages → Create a project
3. 上传 `task-dashboard` 文件夹
4. 部署完成后获得链接

**优点**：免费、速度快、支持自定义域名。

---

## iPhone 使用建议

- 用 Safari 打开链接后，点击底部「分享」按钮 →「添加到主屏幕」
- 这样任务台会像 App 一样出现在主屏幕，全屏运行，体验更好
- 数据保存在当前浏览器中，换浏览器或清除缓存会丢失，记得定期导出备份

---

## 需要我帮你做什么？

如果你告诉我你更倾向哪个平台（Netlify / GitHub Pages / Vercel / Cloudflare），我可以继续帮你准备对应的配置文件或详细步骤。
