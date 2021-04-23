import axios from 'axios'
import faker from 'faker'
import { AxiosHttpClient } from './axios-http-client'
import { HttpPostParams } from '@/data/protocols/http'
import { mockHttpPostParams } from '@/data/tests'
import { makeAxios } from '@/infra/test'

jest.mock('axios')

interface SutTypes {
  sut: AxiosHttpClient,
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  return {
    sut: new AxiosHttpClient(),
    mockedAxios: makeAxios()
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const requestParams = mockHttpPostParams()
    const { sut, mockedAxios } = makeSut()
    sut.post(requestParams)
    expect(mockedAxios.post).toHaveBeenCalledWith(requestParams.url, requestParams.body)
  })

  test('Should return the correct values', async () => {
    const requestParams = mockHttpPostParams()
    const { sut, mockedAxios } = makeSut()
    const returnedValues = sut.post(requestParams)
    const expectedValues = mockedAxios.post.mock.results[0].value
    expect(returnedValues).toEqual(expectedValues)
  })
})