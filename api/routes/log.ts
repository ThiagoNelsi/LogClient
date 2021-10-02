import { Router } from 'express';
import { MongoClient } from 'mongodb';
import { ListLogsController } from '../controllers/ListLogs';
import { PostLogController } from '../controllers/PostLog';
import { ISocket } from '../definitions/ISocket';
import { MongoDBLogRepository } from '../repositories/MongoDB/Log';


export default (router: Router, socket: ISocket, mongoClient: MongoClient) => {

  const logRepository = new MongoDBLogRepository(mongoClient);
  const postLogController = new PostLogController(socket, logRepository);
  const listLogsController = new ListLogsController(logRepository);

  router.post('/logs', async (req, res) => {
    const result = await postLogController.handle(req);
    res.status(result.statusCode).end();
  });

  router.get('/logs', async (req, res) => {
    const result = await listLogsController.handle(req);
    res.status(result.statusCode).json(result.data);
  });

}
