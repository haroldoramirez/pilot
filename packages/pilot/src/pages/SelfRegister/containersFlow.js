const containersFlowForward = {
  'create-account': 'check-cnpj',
  'check-cnpj': data => (data.hasCNPJ ? 'type-cnpj' : 'without-cnpj'),
  'type-cnpj': 'company-data',
  'company-data': 'partner-data-part-1',
  'partner-data-part-1': 'partner-data-part-2',
}

const containersFlowPrevious = {
  'partner-data-part-2': 'partner-data-part-1',
  'partner-data-part-1': 'company-data',
  'company-data': 'type-cnpj',
  'without-cnpj': 'check-cnpj',
  'type-cnpj': 'check-cnpj',
  'check-cnpj': 'create-account',
}

const firstContainers = 'create-account'
const lastContainers = 'partner-data-part-2'

export {
  firstContainers,
  lastContainers,
  containersFlowForward,
  containersFlowPrevious,
}
