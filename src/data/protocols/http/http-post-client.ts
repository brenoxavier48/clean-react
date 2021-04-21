import { HttpResponse } from '@/data/protocols/http/http-response'

export type HttpPostParams<T> = {
  url: string
  body?: T
  headers?: object
}

export interface HttpPostClient<T, R> {
  post (params: HttpPostParams<T>): Promise<HttpResponse<R>>
}
