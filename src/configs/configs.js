const isProd = String(process.env.NODE_ENV).toLowerCase() === 'production'

function getServerConfiguration() {
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
