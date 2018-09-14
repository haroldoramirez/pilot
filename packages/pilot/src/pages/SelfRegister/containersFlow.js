const isAlreadySell = (containerYes, containerNo) => ({ alreadySell }) =>
  ((alreadySell === true) ? containerYes : containerNo)

const containersFlowForward = {
  'create-account': 'check-cnpj',
  'check-cnpj': data => (data.hasCNPJ ? 'type-cnpj' : 'without-cnpj'),
  'type-cnpj': 'company-data',
  'company-data': 'partner-data',
  'partner-data': 'partner-address',
  'partner-address': 'already-sell',
  'already-sell': isAlreadySell('business-detail-present', 'business-detail-future'),
  'business-detail-present': 'sales-amount-present',
  'business-detail-future': 'sales-amount-future',
  'sales-amount-present': 'contract',
  'sales-amount-future': 'contract',
  contract: 'waiting-risk-analysis',
}

const containersFlowPrevious = {
  contract: isAlreadySell('sales-amount-present', 'sales-amount-future'),
  'sales-amount-future': 'business-detail-future',
  'sales-amount-present': 'business-detail-present',
  'business-detail-future': 'already-sell',
  'business-detail-present': 'already-sell',
  'already-sell': 'partner-address',
  'partner-address': 'partner-data',
  'partner-data': 'company-data',
  'company-data': 'type-cnpj',
  'without-cnpj': 'check-cnpj',
  'type-cnpj': 'check-cnpj',
  'check-cnpj': 'create-account',
}

const firstContainers = 'create-account'
const lastContainers = 'contract'

export {
  firstContainers,
  lastContainers,
  containersFlowForward,
  containersFlowPrevious,
}
