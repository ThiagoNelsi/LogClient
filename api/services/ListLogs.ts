import { ILogRepository } from "../definitions/ILogRepository";

export class ListLogsService {

  constructor(private logRepository: ILogRepository) {}

  exec() {
    return this.logRepository.list();
  }

}
