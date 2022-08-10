import axios, { Method } from 'axios'
import configs from '../../configs/configs'

const instance = axios.create({
  baseURL: configs.serverConfig.baseURL ?? '',
  headers: {
    'content-type': 'application/json',
  },
})

const getAPIData = async (method: Method, url: string, postData: any) => {
  const response = await instance({
    method,
    url,
    data: postData,
  })

  return response
}

export default getAPIData
