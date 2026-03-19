# Installing Understand-Anything for Cursor

## Prerequisites

- Git

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Lum1104/Understand-Anything.git ~/.cursor/understand-anything
   ```

2. **Create the plugin symlink:**
   ```bash
   mkdir -p ~/.cursor/plugins
   ln -s ~/.cursor/understand-anything/understand-anything-plugin ~/.cursor/plugins/understand-anything
   ```

3. **Restart Cursor** to discover the plugin.

## Usage

Skills activate automatically when relevant. Use `/understand` to analyze a codebase.

## Updating

```bash
cd ~/.cursor/understand-anything && git pull
```

## Uninstalling

```bash
rm ~/.cursor/plugins/understand-anything
rm -rf ~/.cursor/understand-anything
```
