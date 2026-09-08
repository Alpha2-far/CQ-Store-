#!/usr/bin/env node

const { execSync } = require('child_process');

// PostToolUse contract : stdin receives execution data, stdout must return {}
let input = '';
process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  let workspaceRoot = process.cwd();

  try {
    const data = JSON.parse(input);
    if (data.workspacePaths && data.workspacePaths.length > 0) {
      workspaceRoot = data.workspacePaths[0];
    }
  } catch (e) {}

  // Mettre à jour le graphe de connaissances automatiquement après écriture de code
  try {
    execSync('graphify update --scope all .', { cwd: workspaceRoot, stdio: 'ignore', timeout: 25000 });
  } catch (err) {
    // Si graphify n'est pas disponible dans le PATH ou erreur mineure, ne pas bloquer
  }

  process.stdout.write(JSON.stringify({}));
});
