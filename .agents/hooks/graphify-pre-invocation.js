#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

  const graphJsonPath = path.join(workspaceRoot, '.graphify', 'graph.json');
  const graphExists = fs.existsSync(graphJsonPath);

  // Si le graphe n'existe pas encore, tenter de l'initialiser
  if (!graphExists) {
    try {
      execSync('graphify update --scope all .', { cwd: workspaceRoot, stdio: 'ignore', timeout: 25000 });
    } catch (err) {
      // Si la commande échoue, l'instruction indiquera d'installer graphify
    }
  }

  const output = {
    injectSteps: [
      {
        ephemeralMessage: "📊 [HOOK GRAPHIFY ACTIF & OBLIGATOIRE] :\n" +
          "1. Sur TOUT projet de code, assurez-vous que Graphify (https://github.com/Graphify-Labs/graphify.git) est initialisé via `graphify update .`.\n" +
          "2. Pour TOUTE requête d'analyse, d'architecture ou de recherche dans le code, vous DEVEZ OBLIGATOIREMENT interroger le graphe en priorité avec `graphify query \"<question>\"`, `graphify path <source> <target>`, ou `graphify explain <concept>`.\n" +
          "3. Le graphe est automatiquement recalculé et tenu à jour après chaque modification de code."
      }
    ]
  };

  process.stdout.write(JSON.stringify(output));
});
