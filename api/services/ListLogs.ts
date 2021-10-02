import { ILogRepository } from "../definitions/ILogRepository";
import { IService } from "./IService";

export class ListLogsService implements IService<void, Promise<string[]>> {

  constructor(private logRepository: ILogRepository) {}

  exec() {
    return this.logRepository.list();
  }

}
