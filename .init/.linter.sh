#!/bin/bash
cd /home/kavia/workspace/code-generation/smart-knowledge-base-131702/knowledge_base_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

