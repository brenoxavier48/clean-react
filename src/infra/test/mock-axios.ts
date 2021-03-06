import axios from 'axios'
import faker from 'faker'

export const makeAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post
    .mockClear()
    .mockResolvedValue({
      data: faker.random.objectElement(),
      status: faker.datatype.number()
    })
  return mockedAxios
}
