#!/usr/bin/env node

// Hook PreInvocation : injecte un rappel systématique à l'agent avant chaque invocation
// pour qu'il consulte la documentation Context7 avant d'effectuer du code.

let input = '';
process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  const output = {
    injectSteps: [
      {
        ephemeralMessage: "⚡ [HOOK CONTEXT7 OBLIGATOIRE] : Pour toute tâche impliquant du code ou des dépendances (Express, Prisma, Cloudinary, etc.), tu DOIS impérativement consulter la documentation officielle en temps réel via le MCP context7 (outils 'resolve-library-id' puis 'query-docs') avant de produire ou modifier du code."
      }
    ]
  };

  process.stdout.write(JSON.stringify(output));
});
