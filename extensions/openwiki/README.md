# OpenWiki Extension - Modular Structure

## Directory Structure

```
extensions/
├── openwiki.ts                    # Main entry point
└── openwiki/                      # Modular components
    ├── constants.ts               # Constants and types
    ├── git-utils.ts              # Git operations
    ├── metadata.ts               # Metadata management
    ├── prompts.ts                # System prompts
    ├── commands.ts               # Command handlers
    ├── tools.ts                  # Tool definitions
    └── events.ts                 # Event handlers
```

## Module Responsibilities

### `openwiki.ts` (Entry Point)
- Main extension export
- Orchestrates registration of commands, tools, and events

### `constants.ts`
- Configuration constants (OPENWIKI_DIR, METADATA_FILE)
- TypeScript interfaces (UpdateMetadata)

### `git-utils.ts`
- Git repository detection
- Git context collection (status, log, diff)
- Repository structure discovery
- Snapshot hash computation

### `metadata.ts`
- Metadata loading from disk
- Metadata saving to disk
- Metadata validation

### `prompts.ts`
- System prompts for init, update, and chat modes
- Centralized prompt management

### `commands.ts`
- `/openwiki:init` - Initialize documentation
- `/openwiki:update` - Update documentation
- `/openwiki:chat` - Ask questions

### `tools.ts`
- `openwiki_save_metadata` - Save tracking metadata
- `openwiki_ensure_agents_md` - Update agent instruction files

### `events.ts`
- Session start notifications
- File operation status updates

## Benefits of This Structure

1. **Separation of Concerns**: Each module has a single responsibility
2. **Testability**: Individual modules can be tested in isolation
3. **Maintainability**: Easy to locate and update specific functionality
4. **Reusability**: Utilities can be imported across modules
5. **Clarity**: Clear organization makes the codebase easier to understand
6. **Extensibility**: New features can be added without modifying existing code

## Adding New Features

### Adding a New Command
1. Add command handler to `commands.ts`
2. Update prompts in `prompts.ts` if needed
3. Export from main `openwiki.ts` (already done via `registerCommands`)

### Adding a New Tool
1. Add tool definition to `tools.ts`
2. Add any helper functions to appropriate utility modules
3. Export from main `openwiki.ts` (already done via `registerTools`)

### Adding New Utilities
1. Create utility functions in appropriate module (git-utils, metadata, etc.)
2. Or create a new module if it's a new concern
3. Import where needed

## Development Workflow

1. Make changes to specific modules
2. Run `/reload` in Pi to reload the extension
3. Test the changes
4. Repeat

## Type Safety

All modules use TypeScript with proper type definitions from:
- `@earendil-works/pi-coding-agent` - Extension types
- `typebox` - Schema definitions
- Node.js built-in types

## Future Enhancements

Potential modules to add:
- `validation.ts` - Input validation utilities
- `templates.ts` - Documentation templates
- `report.ts` - Summary and reporting utilities
- `config.ts` - User configuration management
