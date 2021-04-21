import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/erros'
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) { }

  async auth (params: AuthenticationParams): Promise<void> {
    const { statusCode } = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (statusCode) {
      case HttpStatusCode.ok:
        break

      case HttpStatusCode.unathorized:
        throw new InvalidCredentialsError()

      default:
        throw new UnexpectedError()
    }
  }
}

export default RemoteAuthentication
