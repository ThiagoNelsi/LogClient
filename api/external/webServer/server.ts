import express, { Router, Express } from "express";
import cors from 'cors';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import logRoutes from '../../routes/log';
import { ISocket } from "../../definitions/ISocket";
import { MongoClient } from "mongodb";

export class WebServer {

  app: Express;
  routes: Router;
  socket: ISocket;
  httpServer: http.Server;

  constructor(mongoClient: MongoClient) {
    this.app = express();
    this.routes = Router();
    this.httpServer = http.createServer(this.app);

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use('/', express.static(path.join(__dirname, '../../../public')));
    this.app.use(this.routes);

    this.socket = new Server(this.httpServer, {
      cors: {
        origin: '*'
      }
    });

    this.setupRoutes(mongoClient);

  }

  start(PORT: number) {
    return new Promise(resolve => {
      this.httpServer.listen(PORT, () => resolve(`Server listening on port ${PORT}`));
    });
  }

  private setupRoutes(mongoClient: MongoClient) {
    logRoutes(this.routes, this.socket, mongoClient);
  }

}
