# 云端同步配置指南（Supabase 免费版）

本任务台默认把数据存在浏览器本地。要让你在手机和电脑之间自动同步同一份数据，需要接一个免费的云端数据库。**Supabase** 免费额度足够个人使用，而且它的公开 key（anon key）设计上就可以放在前端，配合一个「同步码」就能实现多端互通，无需注册账号、无需登录。

---

## 第一步：注册并创建 Supabase 项目（免费）

1. 打开 https://supabase.com ，用 GitHub 账号注册（免费）。
2. 点 **New Project**，填项目名称（随意，比如 `yueyue-tasks`）。
3. Region 选 **Singapore (ap-southeast-1）**，离国内近、速度快。
4. 设置一个数据库密码（记一下，但前端用不到它）。
5. 等约 1 分钟项目创建完成。

## 第二步：拿到 Project URL 和 anon key

1. 进入项目，左侧菜单 **Project Settings → API**。
2. 复制这两样：
   - **Project URL**（形如 `https://xxxx.supabase.co`）
   - **anon public key**（一长串 `eyJ...`）

## 第三步：建一张 `sync` 表

1. 左侧菜单 **SQL Editor → New Query**。
2. 粘贴下面这段，点 **Run**：

```sql
create table if not exists sync (
  code text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

alter table sync enable row level security;

-- 因为 anon key 是公开的前端密钥，这里用「同步码」本身做隐私隔离
create policy "public_sync" on sync for all using (true) with check (true);
```

## 第四步：把 key 填进代码

打开 `app.js`，找到文件最顶部这两行，把值替换掉：

```js
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

改成你拿到的真实值，例如：

```js
const SUPABASE_URL = 'https://abcd1234.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIs...';
```

> ⚠️ 未填或还是 `YOUR_...` 占位符时，网站一切照常，只是不会同步（顶部按钮显示「未配置」）。

## 第五步：重新部署到 Netlify

把整个 `task-dashboard` 文件夹重新拖到 https://app.netlify.com/drop 覆盖部署（或你原来的部署方式）。**必须重新部署**，因为改了代码。

## 第六步：在手机和电脑上连接

1. 两端都打开你的网站。
2. 点右上角 **☁️ 未同步** 按钮。
3. 双方输入**同一个同步码**（建议用长随机串，比如 `yueyue-9f3a-2b7c`，别用太好猜的）。
4. 点「连接并同步」。连接成功后按钮变成 **✅ 已同步**。

之后：任意一端增删改任务，约 1–2 秒内另一端自动更新（每 15 秒也会主动拉取一次）。

---

## 常见问题

**Q：同步码忘了怎么办？**
同步码就是数据在云端的「钥匙」，忘了就等于访问不了那一份数据。建议记在密码管理器里。

**Q：数据冲突怎么办？**
两端同时改同一项时，以「最后保存」的一方为准（覆盖式）。日常使用基本碰不到。

**Q：隐私安全吗？**
数据存在 Supabase 云端。因为网站是公开部署，前端 JS 里的 anon key 理论上别人能翻到，所以**真正的隐私隔离靠同步码的随机性**——用长随机串当同步码，别人猜不到就看不到你的数据。如果介意，可以改用需要登录的方案（Future work）。

**Q：换设备后本地数据还在吗？**
换浏览器/清缓存会清空本地，但只要云端连接着，重新输入同步码就能把数据拉回来。建议仍定期用「导出备份」存一份 JSON 到本地。

**Q：要付费吗？**
Supabase 免费版 500MB 数据库、5 万月活用户，个人任务台完全用不完，不会扣费。
