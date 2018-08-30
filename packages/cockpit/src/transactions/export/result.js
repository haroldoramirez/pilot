import {
  applySpec,
  either,
  isEmpty,
  isNil,
  map,
  path,
  pick,
  pipe,
  prop,
  uniq,
} from 'ramda'

import { transactionSpec } from '../shared/export'


const pickProps = [
  'amount',
  'antifraud',
  'brand_name',
  'capture_method',
  'documents',
  'email',
  'id',
  'ip',
  'name',
  'paid_amount',
  'payment_method',
  'risk_level',
  'status',
  'status_reason',
  'subscription',
  'updated_at',
]

const isNilOrEmpty = either(isNil, isEmpty)

const exportKeys = (exportData) => {
  if (isNilOrEmpty(exportData)) {
    return null
  }
  const firstLine = pick(pickProps, prop('_source', exportData[0]))
  const values = uniq(Object.keys(firstLine).concat(pickProps))

  return values.join('\","').replace('','\"').concat('\"') // eslint-disable-line
}

const exportValues = (exportData) => {
  const values = Object.values(exportData)
  return [values.join('\","').replace('','\"').concat('\"')] // eslint-disable-line
}

const formatToCSV = exportData => exportValues(exportData)

const formatToXLS = exportData => exportValues(exportData)

const format = exportType => (exportData) => {
  if (exportType === 'csv') {
    return formatToCSV(exportData)
  }

  if (exportType === 'xls') {
    return formatToXLS(exportData)
  }

  return null
}
const mapSourceToData = applySpec(transactionSpec)

const formatLines = exportType => map(pipe(
  prop('_source'),
  mapSourceToData,
  format(exportType)
))

const buildData = exportType => (exportData) => {
  const getHeader = exportKeys(exportData)
  const getLines = formatLines(exportType)
  return [getHeader].concat(getLines(exportData)).join('\r\n')
}

const buildResult = exportType => pipe(
  path(['hits', 'hits']),
  buildData(exportType)
)

export default buildResult
