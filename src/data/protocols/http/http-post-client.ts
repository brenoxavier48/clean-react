export type HttpPostParams = {
  url: string
  body?: object
  headers?: object
}

export interface HttpPostClient {
  post (params: HttpPostParams): Promise<void>
}