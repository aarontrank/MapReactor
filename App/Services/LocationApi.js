import apisauce from 'apisauce'
const { host } = require('./ApiConfig');

const create = (baseURL = host) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  if (__DEV__ && console.tron) {
    api.addMonitor(console.tron.apisauce)
  }

  const getLocation = (id) => api.get('location', {id: id})
  const updateLocation = (user) => api.post('location', user)

  return {
    getLocation, updateLocation
  }
}

export default {
  create,
}
