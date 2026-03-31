# Installing Understand-Anything for Hermes Agent

## Prerequisites

- Git
- [Hermes Agent](https://github.com/NousResearch/hermes-agent) installed
- `pnpm` available in `PATH`

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Lum1104/Understand-Anything.git ~/.hermes/understand-anything
   ```

2. **Create the Hermes skill symlinks:**
   ```bash
   mkdir -p ~/.hermes/skills
   for skill in understand understand-chat understand-dashboard understand-diff understand-explain understand-onboard; do
     ln -sf ~/.hermes/understand-anything/understand-anything-plugin/skills/$skill ~/.hermes/skills/$skill
   done
   [ -e ~/.understand-anything-plugin ] || [ -L ~/.understand-anything-plugin ] || ln -s ~/.hermes/understand-anything/understand-anything-plugin ~/.understand-anything-plugin
   ```

3. **Restart Hermes Agent** to discover the skills.

## Verify

```bash
ls -la ~/.hermes/skills | grep understand
```

## Usage

Make sure the active Hermes session exposes the `skills`, `terminal`, and `file` toolsets.

```bash
hermes chat --toolsets "skills,terminal,file" -q "/understand"
hermes chat --toolsets "skills,terminal,file" -q "/understand-dashboard"
```

## Updating

```bash
cd ~/.hermes/understand-anything && git pull
```

## Uninstalling

```bash
for skill in understand understand-chat understand-dashboard understand-diff understand-explain understand-onboard; do
  rm -f ~/.hermes/skills/$skill
done
rm -f ~/.understand-anything-plugin
rm -rf ~/.hermes/understand-anything
```
