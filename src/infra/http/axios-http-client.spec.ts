import axios from 'axios'
import faker from 'faker'
import { AxiosHttpClient } from './axios-http-client'
import { HttpPostParams } from '@/data/protocols/http'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosReturn = {
  data: faker.random.objectElement(),
  status: ''
}
mockedAxios.post.mockResolvedValue(mockedAxiosReturn)

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const makeHttpPostParams = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const requestParams = makeHttpPostParams()
    const sut = makeSut()
    sut.post(requestParams)
    expect(mockedAxios.post).toHaveBeenCalledWith(requestParams.url, requestParams.body)
  })

  test('Should return the correct values', async () => {
    const requestParams = makeHttpPostParams()
    const sut = makeSut()
    const returnedValues = await sut.post(requestParams)
    expect(returnedValues).toEqual({
      statusCode: mockedAxiosReturn.status,
      body: mockedAxiosReturn.data
    })
  })
})