import fetch from 'isomorphic-fetch'

const create = () =>
  fetch('http://www.mocky.io/v2/5b95b51b3200007b00cdb725')
    .then(res => res.json())

export default { create }
