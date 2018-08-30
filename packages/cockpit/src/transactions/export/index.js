import buildQuery from '../search/query'
import buildResult from './result'

const exportData = client => (clientFilter, exportType) => {
  const filter = clientFilter || {}
  const query = buildQuery(filter)

  return client.search({
    type: 'transaction',
    query: JSON.stringify(query),
  })
    .then(buildResult(exportType))
}

export default exportData
