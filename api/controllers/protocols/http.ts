export interface HttpResponse<ResponseBodyType = any> {
  statusCode: number;
  data?: ResponseBodyType;
  error?: any;
}

export interface HttpRequest<BodyType = any, ParamsType = any, QueryType = any, HeaderType = any> {
  headers: HeaderType;
  body: BodyType;
  params: ParamsType;
  query: QueryType;
}
