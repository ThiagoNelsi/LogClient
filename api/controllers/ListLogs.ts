import { ILogRepository } from "../definitions/ILogRepository";
import { ListLogsService } from "../services/ListLogs";
import { BaseController } from "./BaseController";
import { HttpRequest } from "./protocols/http";

export class ListLogsController extends BaseController {

  private service: ListLogsService;

  constructor(logRepository: ILogRepository) {
    super();
    this.service = new ListLogsService(logRepository);
  }

  async handle(request: HttpRequest) {
    try {
      const logs = await this.service.exec();
      return this.send(logs);
    } catch (err) {
      return this.unknownServerError(err as Error);
    }
  }

}
