import faker from 'faker'

import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { AccountModel } from '@/domain/models/account-model'
import { mockAccount } from '@/domain/test/mock-account'

export class AuthenticationSpy implements Authentication {
  account: AccountModel = mockAccount()
  params: AuthenticationParams
  counterCall = 0

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    this.counterCall++
    return Promise.resolve(this.account)
  }
}