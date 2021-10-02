import { config as configEnv } from 'dotenv';
import { MongoDB } from './external/database/MongoDB';
import { WebServer } from './external/webServer/server';

const PORT = process.env.PORT || 3311;

configEnv();

async function start() {
  const mongoClient = await MongoDB.connect();
  const webServer = new WebServer(mongoClient);
  webServer.start(Number(PORT)).then(console.log);
}
start();
