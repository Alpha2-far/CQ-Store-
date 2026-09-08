const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`🚀 GQ Store Administration disponible sur http://localhost:${PORT}/admin`);
  console.log(`🌍 Environnement : ${process.env.NODE_ENV || 'development'}`);
});

process.on('SIGTERM', () => {
  console.log('Fermeture du serveur...');
  server.close(() => {
    process.exit(0);
  });
});

module.exports = server;
