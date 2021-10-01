import { ILogRepository } from "../definitions/ILogRepository";
import { ISocket } from "../definitions/ISocket";

export class SaveLogService {

  constructor(private logRepository: ILogRepository, private socket: ISocket) {}

  exec(log: string) {
    this.logRepository.create(log);
    this.socket.emit('newLog', log);
  }

}
