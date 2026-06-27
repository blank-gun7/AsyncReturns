#!/bin/bash
set -euo pipefail

SKILLS_SRC="${CLAUDE_PROJECT_DIR:-$(pwd)}/.agents/skills"
SKILLS_DEST="$HOME/.claude/skills"

if [ -d "$SKILLS_SRC" ]; then
  mkdir -p "$SKILLS_DEST"
  for skill_dir in "$SKILLS_SRC"/*/; do
    skill_name=$(basename "$skill_dir")
    if [ ! -e "$SKILLS_DEST/$skill_name" ]; then
      ln -sf "$skill_dir" "$SKILLS_DEST/$skill_name"
    fi
  done
fi
