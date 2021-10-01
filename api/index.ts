import express, { Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { LocalFileRepository } from './repositories/LocalFile';
import { ListLogsService } from './services/ListLogs';
import { SaveLogService } from './services/SaveLog';

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

const localFileRepository = new LocalFileRepository()
const saveLog = new SaveLogService(localFileRepository, io);
const listLogs = new ListLogsService(localFileRepository);

app.post('/log', (req: Request, res: Response) => {
  saveLog.exec(req.body.log);
  res.end();
});

app.get('/', async (req: Request, res: Response) => {
  const logs = await listLogs.exec();
  res.json(logs);
});

server.listen(3311, () => {
  console.log('listening on http://localhost:3311');
});
