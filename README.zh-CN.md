# pi-openwiki

> 自动生成并维护与你的代码保持同步的 AI 文档

pi-openwiki 使用 Pi 的 AI 能力，为你的代码库自动生成并维护完整的文档。

**基于 [OpenWiki by LangChain](https://github.com/langchain-ai/openwiki)**，并适配为 Pi coding agent 扩展。

## 快速开始

```bash
# 从 npm 安装
pi install npm:pi-openwiki

# 生成文档
cd your-project
pi
/openwiki:init

# 代码变更后更新文档
/openwiki:update

# 提问代码库相关问题
/openwiki:chat How does authentication work?
```

## 生成内容

运行 `/openwiki:init` 后，会生成：

```text
openwiki/
├── quickstart.md              # 从这里开始
├── architecture/              # 系统设计
├── workflows/                 # 开发流程
├── domain/                    # 业务逻辑
├── operations/                # 部署与运维
└── testing/                   # 测试策略
```

## 功能特性

- 🤖 **AI 生成** - 使用你的 Pi 模型理解代码库
- 🔄 **Git 感知** - 只更新发生变化的部分
- 🎯 **面向 Agent 优化** - 同时适合人类和 AI agent 阅读
- ⚡ **智能更新** - 避免重复生成不必要的文档

## 命令

### `/openwiki:init`

为当前仓库生成初始文档。

### `/openwiki:update`

根据上次运行后的 Git 变更更新文档。

### `/openwiki:chat <question>`

询问代码库相关问题，不会修改文档。

## 安装方式

```bash
# 全局安装，所有项目可用
pi install npm:pi-openwiki

# 项目级安装
pi install -l npm:pi-openwiki

# 从 GitHub 安装
pi install git:github.com/barvhaim/pi-openwiki

# 临时使用，仅当前会话生效
pi -e git:github.com/barvhaim/pi-openwiki

# 本地开发
pi -e /path/to/pi-openwiki
```

## 工作原理

1. **发现** - 分析仓库结构和 Git 历史
2. **理解** - 理解代码背后的设计原因
3. **生成** - 创建结构化 Markdown 文档
4. **跟踪** - 保存元数据，用于智能增量更新
5. **集成** - 自动更新 `AGENTS.md` / `CLAUDE.md`

## 环境要求

- Pi >= 0.80.0
- Git 仓库
- Node.js 和 TypeScript

## Pi 包目录

该包已为 [Pi package gallery](https://pi.dev/packages) 准备好。发布到 npm 后，包名为 `pi-openwiki`，并声明了 Pi 所需的包元数据：

```json
{
  "keywords": ["pi-package"],
  "pi": {
    "extensions": ["./extensions"]
  }
}
```

发布到 npm 后，可以这样安装：

```bash
pi install npm:pi-openwiki
```

## 开发

```bash
# 克隆并安装依赖
git clone https://github.com/barvhaim/pi-openwiki.git
cd pi-openwiki
npm install

# 本地测试
pi -e .

# 修改后重新加载
/reload
```

### 架构

项目采用模块化设计，方便维护：

```text
extensions/openwiki/
├── commands.ts      # 命令处理
├── tools.ts         # AI 工具
├── events.ts        # 事件处理
├── git-utils.ts     # Git 工具函数
├── metadata.ts      # 元数据管理
├── prompts.ts       # 系统提示词
└── constants.ts     # 常量和类型
```

更多细节请参考 [extensions/openwiki/README.md](extensions/openwiki/README.md)。

## 故障排查

**"Not in a git repository!"**  
请先初始化 Git 仓库：`git init && git add . && git commit -m "init"`

**命令没有显示？**  
重新加载 Pi：`/reload`

**"No changes detected"**  
这是正常情况，表示自上次更新后代码没有变化。

## 许可证

MIT

## 致谢

该 Pi 扩展基于 LangChain AI 的 [OpenWiki](https://github.com/langchain-ai/openwiki)，并适配到 Pi coding agent 生态。

## 贡献

欢迎在 [github.com/barvhaim/pi-openwiki](https://github.com/barvhaim/pi-openwiki) 提交 Issue 和 PR。
