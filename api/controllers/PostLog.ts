import { ILogRepository } from "../definitions/ILogRepository";
import { ISocket } from "../definitions/ISocket";
import { SaveLogService } from "../services/SaveLog";
import { BaseController } from "./BaseController";
import { HttpRequest } from "./protocols/http";

export class PostLogController extends BaseController<void> {

  private service: SaveLogService;

  constructor(socket: ISocket, logRepository: ILogRepository) {
    super();
    this.service = new SaveLogService(logRepository, socket);
  }

  async handle(request: HttpRequest) {
    const { log } = request.body;
    try {
      this.service.exec(log);
      return this.ok();
    } catch (err) {
      return this.unknownServerError(err as Error);
    }
  }

}
