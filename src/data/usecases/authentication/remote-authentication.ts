import { HttpPostClient } from '../../protocols/http/http-post-client'
import { Authentication, AuthenticationParams } from '../../../domain/usecases/authentication'
class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) { }

  async auth (params: AuthenticationParams): Promise<void> {

    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
  }
}

export default RemoteAuthentication
