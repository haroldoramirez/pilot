import fetch from 'isomorphic-fetch'
import { apiUrl } from '../../environment'

const registerCompany = registerData =>
  fetch(`${apiUrl}comapnies`, {
    method: 'POST',
    body: registerData,
  })

export default registerCompany
