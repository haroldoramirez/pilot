const { REACT_APP_API_ENVIRONMENT } = process.env

const env = REACT_APP_API_ENVIRONMENT === 'live' ? 'live' : 'test'

const apiUrl = 'https://api.pagar.me/1/'

export { apiUrl }

export default env
