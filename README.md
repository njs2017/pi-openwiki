# pi-openwiki

[简体中文](README.zh-CN.md)

> AI-powered documentation that stays current with your code

Automatically generates and maintains comprehensive documentation for your codebase using Pi's AI capabilities.

**Based on [OpenWiki by LangChain](https://github.com/langchain-ai/openwiki)** - adapted as a Pi coding agent extension.

## Quick Start

```bash
# Install from npm
pi install npm:pi-openwiki

# Generate docs
cd your-project
pi
/openwiki:init

# Update after code changes
/openwiki:update

# Ask questions
/openwiki:chat How does authentication work?
```

## What You Get

After running `/openwiki:init`:

```
openwiki/
├── quickstart.md              # Start here
├── architecture/              # System design
├── workflows/                 # Development processes
├── domain/                    # Business logic
├── operations/                # Deployment
└── testing/                   # Test strategies
```

## Features

- 🤖 **AI-Generated** - Leverages your Pi model to understand your codebase
- 🔄 **Git-Aware** - Updates only what changed
- 🎯 **Agent-Optimized** - Works for humans and AI agents
- ⚡ **Smart** - Prevents redundant regeneration

## Commands

### `/openwiki:init`
Generate initial documentation for your repository.

### `/openwiki:update`
Update docs based on git changes since last run.

### `/openwiki:chat <question>`
Ask questions about your codebase without modifying docs.

## Installation Options

```bash
# Global (use everywhere)
pi install npm:pi-openwiki

# Project-specific
pi install -l npm:pi-openwiki

# From GitHub
pi install git:github.com/barvhaim/pi-openwiki

# Temporary (this session only)
pi -e git:github.com/barvhaim/pi-openwiki

# Local development
pi -e /path/to/pi-openwiki
```

## How It Works

1. **Discovery** - Explores your repository structure and git history
2. **Analysis** - Understands the "why" behind your code
3. **Generation** - Creates structured markdown documentation
4. **Tracking** - Saves metadata for smart incremental updates
5. **Integration** - Updates `AGENTS.md`/`CLAUDE.md` automatically

## Requirements

- Pi >= 0.80.0
- Git repository
- Node.js with TypeScript

## Package Gallery

This package is prepared for the [Pi package gallery](https://pi.dev/packages). It is ready to publish as `pi-openwiki` and declares the required Pi package metadata:

```json
{
  "keywords": ["pi-package"],
  "pi": {
    "extensions": ["./extensions"]
  }
}
```

After publishing to npm, the package can be installed with:

```bash
pi install npm:pi-openwiki
```

## Development

```bash
# Clone and install dependencies
git clone https://github.com/barvhaim/pi-openwiki.git
cd pi-openwiki
npm install

# Test locally
pi -e .

# Make changes and reload
/reload
```

### Architecture

Modular design for maintainability:

```
extensions/openwiki/
├── commands.ts      # Command handlers
├── tools.ts         # AI tools
├── events.ts        # Event handlers
├── git-utils.ts     # Git operations
├── metadata.ts      # Metadata management
├── prompts.ts       # System prompts
└── constants.ts     # Constants & types
```

See [extensions/openwiki/README.md](extensions/openwiki/README.md) for details.

## Troubleshooting

**"Not in a git repository!"**  
Initialize git: `git init && git add . && git commit -m "init"`

**Commands not showing up?**  
Reload Pi: `/reload`

**"No changes detected"**  
Normal - means your code hasn't changed since last update.

## License

MIT

## Credits

This Pi extension is based on [OpenWiki](https://github.com/langchain-ai/openwiki) by LangChain AI, adapted for the Pi coding agent ecosystem.

## Contributing

Issues and PRs welcome at [github.com/barvhaim/pi-openwiki](https://github.com/barvhaim/pi-openwiki)
