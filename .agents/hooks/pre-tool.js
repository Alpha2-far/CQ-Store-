#!/usr/bin/env node

// Hook PreToolUse : se déclenche automatiquement avant toute modification ou création de code
let input = '';
process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  let toolCallName = '';
  let targetFile = '';

  try {
    const data = JSON.parse(input);
    if (data.toolCall) {
      toolCallName = data.toolCall.name;
      if (data.toolCall.args && data.toolCall.args.TargetFile) {
        targetFile = data.toolCall.args.TargetFile;
      }
    }
  } catch (e) {
    // Ignorer les erreurs de parsing
  }

  const output = {
    decision: 'allow',
    reason: `Exécution autorisée. Validation Context7 active pour ${targetFile || toolCallName}.`
  };

  process.stdout.write(JSON.stringify(output));
});
