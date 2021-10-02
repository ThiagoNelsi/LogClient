export interface IService<Params, Response> {
  exec(params: Params): Response
}
