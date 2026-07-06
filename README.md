# @openwiki/pi

> AI-powered documentation generation for codebases, integrated with the Pi coding agent

A Pi extension that automatically generates and maintains comprehensive, agent-friendly documentation for your repositories. OpenWiki helps both humans and AI coding agents understand your project by creating structured, git-aware documentation.

## Why OpenWiki?

Traditional documentation becomes outdated quickly and is rarely comprehensive. OpenWiki solves this by:

- 🤖 **AI-Generated**: Leverages your Pi model to understand and document your codebase
- 🔄 **Always Current**: Git-aware incremental updates keep docs in sync with code changes
- 🎯 **Agent-Optimized**: Designed for both human readers and AI coding agents
- 📊 **Structured**: Organized with clear entry points and logical sections
- ⚡ **Smart Updates**: Metadata tracking prevents redundant regeneration

## What is OpenWiki?

OpenWiki is an AI-powered documentation system that generates and maintains comprehensive, agent-friendly documentation for codebases. It creates structured documentation that helps both humans and AI coding agents understand your project.

**Key Concepts:**
- **Quickstart Entry Point**: Every OpenWiki starts with `openwiki/quickstart.md` as the navigation hub
- **Git-Aware**: Tracks repository changes and updates only affected documentation
- **Selective Reading**: The AI strategically samples your codebase rather than reading every file
- **Agent Integration**: Automatically updates `AGENTS.md`/`CLAUDE.md` so AI agents know where to look

## Features

- **Automatic Documentation Generation**: Creates comprehensive docs in `openwiki/` directory
- **Git-Aware Updates**: Incrementally updates docs based on repository changes
- **Structured Documentation**: Organized with quickstart entry point and logical sections
- **Metadata Tracking**: Prevents redundant documentation regeneration
- **Commands**: `/openwiki:init`, `/openwiki:update`, `/openwiki:chat`
- **Tools**: `openwiki_save_metadata`, `openwiki_ensure_agents_md`

## Quick Start

```bash
# 1. Install the package
pi install git:github.com/barvhaim/pi-openwiki

# 2. Navigate to your project
cd /path/to/your/project

# 3. Generate documentation
pi
/openwiki:init

# 4. Update documentation as code changes
/openwiki:update

# 5. Ask questions about your codebase
/openwiki:chat How does authentication work?
```

## Installation

### Option 1: Install from GitHub (Recommended)

```bash
# Global installation
pi install git:github.com/barvhaim/pi-openwiki

# Project-specific installation
cd your-project
pi install -l git:github.com/barvhaim/pi-openwiki
```

### Option 2: Install as a Pi Package

```bash
# Global installation
pi install /path/to/pi-openwiki

# Or install from npm (once published)
pi install npm:@openwiki/pi

# Or install from git
pi install git:github.com/barvhaim/pi-openwiki
```

### Option 3: Use with `-e` flag (temporary)

```bash
pi -e /path/to/pi-openwiki
```

### Option 4: Install in Project Scope

```bash
cd your-project
pi install -l /path/to/pi-openwiki
```

## Usage

Once installed, the OpenWiki extension provides three commands:

### Initialize Documentation

```bash
/openwiki:init
```

This command:
- Analyzes your repository structure
- Reviews git history and recent changes
- Creates comprehensive documentation in the `openwiki/` directory
- Starts with `openwiki/quickstart.md` as the entry point
- Updates `AGENTS.md`/`CLAUDE.md` to reference the documentation

### Update Documentation

```bash
/openwiki:update
```

This command:
- Detects changes since the last documentation update
- Surgically updates only affected documentation sections
- Preserves existing good content
- Tracks update metadata to prevent redundant runs

### Ask Questions

```bash
/openwiki:chat <your question>
```

Chat mode lets you ask questions about the repository without modifying documentation.

## Documentation Structure

OpenWiki organizes documentation into logical sections:

```
openwiki/
├── quickstart.md          # Entry point - start here
├── architecture/          # System design and patterns
├── workflows/             # Development processes
├── domain/               # Business logic and concepts
├── operations/           # Deployment and operations
├── integrations/         # External systems
├── testing/              # Testing strategies
└── .last-update.json     # Metadata (auto-generated)
```

## How It Works

1. **Discovery**: The extension explores your repository using git commands, file listings, and selective code reading
2. **Analysis**: It understands the "why" behind code by reviewing git history and architecture
3. **Generation**: It creates markdown documentation organized into logical sections
4. **Tracking**: It saves metadata to enable smart incremental updates
5. **Integration**: It updates agent instruction files (`AGENTS.md`/`CLAUDE.md`) to reference the docs

## Tools Provided

The extension registers these tools that the AI can use:

- **openwiki_save_metadata**: Saves metadata after generation/update
- **openwiki_ensure_agents_md**: Updates `AGENTS.md`/`CLAUDE.md` with OpenWiki references

## Configuration

The extension automatically detects if you're in a git repository. No additional configuration is needed.

## Development

To modify or extend this package:

1. Clone the repository
2. Edit files in `extensions/openwiki/` (see [Architecture](#architecture))
3. Test with: `pi -e /path/to/pi-openwiki`
4. Reload in active session: `/reload`

## Architecture

The extension is built with a modular architecture for maintainability:

```
extensions/
├── openwiki.ts                    # Main entry point
└── openwiki/                      # Modular components
    ├── constants.ts               # Constants and types
    ├── git-utils.ts              # Git operations
    ├── metadata.ts               # Metadata management
    ├── prompts.ts                # System prompts
    ├── commands.ts               # Command handlers (/openwiki:*)
    ├── tools.ts                  # AI tools (openwiki_*)
    └── events.ts                 # Event handlers
```

See [extensions/openwiki/README.md](extensions/openwiki/README.md) for detailed module documentation.

## Example Output

After running `/openwiki:init`, you'll get a complete documentation structure:

```
openwiki/
├── quickstart.md                    # 📘 Start here - navigation hub
├── architecture/
│   ├── overview.md                  # System design and patterns
│   ├── database-schema.md           # Data models
│   └── api-design.md                # API structure
├── workflows/
│   ├── development.md               # Dev workflow
│   ├── deployment.md                # Deploy process
│   └── testing-strategy.md          # Test approach
├── domain/
│   ├── core-concepts.md             # Business logic
│   └── data-flow.md                 # How data moves
└── .last-update.json                # Metadata (auto-generated)
```

**What's in the docs?**
- Repository overview and purpose
- Architecture decisions and patterns
- Key workflows and processes
- Domain concepts and business logic
- Integration points
- Testing strategies
- Source code maps with references

## Real-World Workflow

```bash
# Day 1: Initialize documentation
cd my-app
pi
/openwiki:init
# ✅ Creates comprehensive documentation structure

# Day 15: After adding new features
git commit -m "Add payment processing"
/openwiki:update
# ✅ Updates only payment-related documentation

# During development: Ask questions
/openwiki:chat How does the payment flow work?
# ✅ AI answers using your documentation + codebase

# Onboarding new team member
# 👉 Point them to openwiki/quickstart.md
# ✅ They get up to speed quickly

# Agent-assisted coding
# ✅ AI agents automatically read OpenWiki via AGENTS.md/CLAUDE.md
# ✅ Better context = better code suggestions
```

## When to Use OpenWiki

✅ **Good for:**
- Medium to large codebases (5k+ lines)
- Projects with multiple contributors
- Codebases with complex architecture
- Projects needing agent-assisted development
- Onboarding new team members
- Documentation that needs to stay current

❌ **Not ideal for:**
- Tiny projects (<1k lines)
- Prototypes or throwaway code
- Well-documented projects with automated docs

## Comparison

| Traditional Docs | OpenWiki |
|-----------------|----------|
| Written by hand | AI-generated |
| Often outdated | Git-aware updates |
| Generic structure | Tailored to your codebase |
| Manual maintenance | Automatic tracking |
| Human-optimized only | Human + Agent optimized |

## Troubleshooting

### "Not in a git repository!"
OpenWiki requires a git repository to track changes.
```bash
git init
git add .
git commit -m "Initial commit"
```

### "No changes detected since last update"
This means your repository hasn't changed since the last `/openwiki:update`. This is normal and prevents redundant work.

### Commands not showing up
Reload Pi to pick up the extension:
```bash
/reload
```

### Extension errors
Check the Pi version:
```bash
pi --version  # Should be >= 0.80.0
```

## Advanced Usage

### Custom Documentation Sections

You can manually edit generated documentation. OpenWiki will preserve your changes during updates and only modify sections affected by code changes.

### Integration with CI/CD

```bash
# In your CI pipeline
pi --provider your-provider --model your-model << 'EOF'
/openwiki:update
EOF
```

### Multiple Projects

Install globally once, use everywhere:
```bash
pi install git:github.com/barvhaim/pi-openwiki
cd project-a && pi
/openwiki:init
cd ../project-b && pi
/openwiki:init
```

## Requirements

- Pi coding agent >= 0.1.0
- Git repository (for documentation generation)
- Node.js with TypeScript support

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or pull request.
