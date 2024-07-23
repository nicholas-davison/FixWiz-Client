const API_URL = 'http://localhost:8000'

export const fetchWithResponse = async (resource, options) => fetch(`${API_URL}/${resource}`, options)
  .then(res => res.json)

export const fetchWithoutResponse = (resource, options) => fetch(`${API_URL}/${resource}`, options)

