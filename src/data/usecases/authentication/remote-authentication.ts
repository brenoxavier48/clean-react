import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/erros/invalid-credentials-error'
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) { }

  async auth (params: AuthenticationParams): Promise<void> {

    const { statusCode } = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (statusCode) {
      case HttpStatusCode.unathorized:
        throw new InvalidCredentialsError()
        
      default:
        return Promise.resolve()
    }

  }
}

export default RemoteAuthentication
