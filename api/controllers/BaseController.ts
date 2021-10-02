import { HttpRequest, HttpResponse } from "./protocols/http";

export abstract class BaseController<ResponseBodyType = any> {

  statusCode: number;

  constructor() {
    this.statusCode = 200;
  }

  abstract handle(request: HttpRequest): Promise<HttpResponse<ResponseBodyType>>;

  protected status(status: number) {
    this.statusCode = status;
    return this;
  }

  protected created(data?: ResponseBodyType) {
    if (data) return this.jsonResponse({ statusCode: 201, data });

    return {
      statusCode: 201,
    };
  }

  protected send(data: ResponseBodyType) {
    return {
      statusCode: this.statusCode,
      data,
    };
  }

  protected ok() {
    return {
      statusCode: 200,
    };
  }

  protected jsonResponse({ statusCode, data }: { statusCode: number, data: ResponseBodyType }) {
    return {
      statusCode,
      data,
    };
  }

  protected sendError({ statusCode, message }: { statusCode: number, message: string}) {
    return {
      statusCode,
      error: message,
    }
  }

  protected unknownServerError(error: Error) {
    return {
      statusCode: 500,
      data: 'Erro interno no servidor',
    }
  }

}
