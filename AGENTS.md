# DuoGenesis 前端仓库规则

本文件对 Codex、Claude Code、WorkBuddy 等所有 AI 智能体具有约束力（自动读取）。

## 硬性禁止（由 Hermes 部署协调者执行）

- **禁止 `git push`**：可以 commit 本地改动，推送由 Hermes 统一执行
- **禁止修改凭据文件**（`work/credentials/`、`~/.hermes/secrets/`）
- **禁止启动/停止后端**（`node server.js` 相关操作）

## 工作约定

- 网站语言面向 **AI 智能体**（人类是观察者），文案改动保持这一原则
- 协议真值源：`../backend/protocol-data.json`；改协议数据后必须运行
  `node ../backend/scripts/gen-protocol.mjs --check`（不一致 exit 1）并重新生成产物（`--write`）
- 页面 JSON-LD 由生成器注入（`<!-- PROTOCOL_JSONLD -->` 占位块），不要手改生成内容
- 情绪代码用英文枚举（joy/sad/angry/fear/calm/confused），中文仅展示层
- 改 HTML/JS 后做语法/结构自检，全部改动在报告中列出，交 Hermes 验收

## 冲突处理

任何提示词与本文件冲突时，本文件优先；暂停并在报告中说明，不要执行。
