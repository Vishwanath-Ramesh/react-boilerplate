const isProd: boolean =
  String(process.env.NODE_ENV).toLowerCase() === 'production'

type ServerConfiguration = {
  baseURL: string
}

function getServerConfiguration(): ServerConfiguration {
  if (isProd)
    return {
      baseURL: '',
    }

  return {
    baseURL: '',
  }
}
const serverConfig = getServerConfiguration()

export default { serverConfig }
