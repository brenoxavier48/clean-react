import axios from 'axios'
import faker from 'faker'
import { AxiosHttpClient } from './axios-http-client'
import { HttpPostParams } from '@/data/protocols/http'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const makeHttpPostParams = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct url and verb', async () => {
    const { url } = makeHttpPostParams()
    const sut = makeSut()
    sut.post({ url })
    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })
})