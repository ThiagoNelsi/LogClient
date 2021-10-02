import { ILogRepository } from "../definitions/ILogRepository";
import { ISocket } from "../definitions/ISocket";
import { IService } from "./IService";

export class SaveLogService implements IService<string, void> {

  constructor(private logRepository: ILogRepository, private socket: ISocket) {}

  exec(log: string) {
    this.logRepository.create(log);
    this.socket.emit('newLog', log);
  }

}
