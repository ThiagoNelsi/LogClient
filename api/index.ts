import express, { Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
import path from 'path';
import { config } from 'dotenv';
import { Server } from 'socket.io';
import { LocalFileRepository } from './repositories/LocalFile/Log';
import { ListLogsService } from './services/ListLogs';
import { SaveLogService } from './services/SaveLog';
import { MongoDBLogRepository } from './repositories/MongoDB/Log';
import { MongoDB } from './external/database/MongoDB';

const PORT = process.env.PORT || 3311;

config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../public')));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

MongoDB.connect().then((mongoClient) => {
  const mongoDBRepository = new MongoDBLogRepository(mongoClient);
  const saveLog = new SaveLogService(mongoDBRepository, io);
  const listLogs = new ListLogsService(mongoDBRepository);

  app.post('/logs', (req: Request, res: Response) => {
    saveLog.exec(req.body.log);
    res.end();
  });

  app.get('/logs', async (req: Request, res: Response) => {
    const logs = await listLogs.exec();
    res.json(logs);
  });

  server.listen(PORT, () => {
    console.log('listening on http://localhost:3311');
  });
})

