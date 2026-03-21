# Installing Understand-Anything for Antigravity

## Prerequisites

- Git

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Lum1104/Understand-Anything.git ~/.antigravity/understand-anything
   ```

2. **Create the skills symlink:**
   ```bash
   mkdir -p ~/.agents/skills
   ln -s ~/.antigravity/understand-anything/understand-anything-plugin/skills ~/.agents/skills/understand-anything
   ```

   **Windows (PowerShell):**
   ```powershell
   New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
   cmd /c mklink /J "$env:USERPROFILE\.agents\skills\understand-anything" "$env:USERPROFILE\.antigravity\understand-anything\understand-anything-plugin\skills"
   ```

3. **Restart the chat or IDE** so Antigravity can discover the skills.

## Verify

```bash
ls -la ~/.agents/skills/understand-anything
```

You should see a symlink pointing to the skills directory in the cloned repo.

## Usage

Skills activate automatically when relevant. You can also invoke directly by saying:
- "Run the understand skill to analyze this codebase"
- "Use the understand-dashboard skill to view the architecture map"
- "Use understand-chat to answer a question about the graph"

## Updating

```bash
cd ~/.antigravity/understand-anything && git pull
```

Skills update instantly through the symlink.

## Uninstalling

```bash
rm ~/.agents/skills/understand-anything
rm -rf ~/.antigravity/understand-anything
```
