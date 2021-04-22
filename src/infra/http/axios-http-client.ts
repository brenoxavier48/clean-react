import axios from 'axios'
import { HttpPostParams, HttpPostClient, HttpResponse } from '@/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const { status, data } = await axios.post(params.url, params.body)

    return {
      statusCode: status,
      body: data
    }
  }
}