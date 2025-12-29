#!/bin/bash
cd /home/kavia/workspace/code-generation/responsive-quiz-app-193066/frontend_quiz_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

