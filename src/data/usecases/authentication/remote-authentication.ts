import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/erros'
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { AccountModel } from '@/domain/models/account-model'

class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) { }

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const { statusCode, body } = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body

      case HttpStatusCode.unathorized:
        throw new InvalidCredentialsError()

      default:
        throw new UnexpectedError()
    }
  }
}

export default RemoteAuthentication
