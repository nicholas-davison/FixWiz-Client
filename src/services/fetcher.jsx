const API_URL = 'https://fixwiz-api-ui6w7.ondigitalocean.app'

export const fetchWithResponse = async (resource, options) => fetch(`${API_URL}/${resource}`, options)
  .then(res => res.json)

export const fetchWithoutResponse = (resource, options) => fetch(`${API_URL}/${resource}`, options)

