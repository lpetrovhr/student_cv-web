import 'whatwg-fetch'

const jsonParser = response => 
  response.json()
    .then(body => ({ response, body }))


const handler = ({ response, body = {} }) => {
  console.log(body)
  if (body.error) {
    const error = new Error(body.error)
    error.code = body.code
    error.status = body.status || response.status
    throw error
  }

  if (response.status < 200 || response.status >= 300) {
    const error = new Error(response.statusText)
    error.status = response.status
    throw error
  }

  return body
}

const errorHandler = (error) => {

  throw error
}

function fetchApi (path) {
  return fetch(path)
    .then(jsonParser)
    .then(handler)
    .catch(errorHandler)
}

const getApi = path =>
  fetchApi(path)

export default {
  get: getApi,
}
