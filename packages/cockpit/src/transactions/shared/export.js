import {
  allPass,
  always,
  applySpec,
  complement,
  cond,
  either,
  equals,
  flatten,
  has,
  head,
  ifElse,
  is,
  isEmpty,
  isNil,
  join,
  juxt,
  last,
  length,
  map,
  of,
  path,
  pathOr,
  pipe,
  propEq,
  propOr,
  propSatisfies,
  reject,
  replace,
  splitAt,
  T,
  unless,
} from 'ramda'

import moment from 'moment'

const isInternational = complement(equals)('BRAZIL')
const LIMITER = '-'

const isAntifraudScoreNil = pipe(
  propOr(LIMITER, 'antifraud_score'),
  isNil
)

const isRefuseReasonNil = pipe(
  propOr(LIMITER, 'refuse_reason'),
  isNil
)

const stringToMoment = unless(
  isNil,
  moment
)

const getCardProp = subProp => cond([
  [
    pipe(
      propOr(LIMITER, 'card'),
      allPass([is(Object), has(subProp)])
    ),
    path(['card', subProp]),
  ],
  [has(`card_${subProp}`), propOr(LIMITER, `card_${subProp}`)],
  [T, always(LIMITER)],
])

const isRefuseReasonAntifraud = pipe(
  propOr(LIMITER, 'refuse_reason'),
  equals('antifraud')
)

const antifraudRecommendation = cond([
  [isAntifraudScoreNil, always(LIMITER)],
  [isRefuseReasonNil, always(LIMITER)],
  [isRefuseReasonAntifraud, always('refused')],
  [T, always('approved')],
])

const getAntifraudProp = ifElse(
  pipe(propOr(LIMITER, 'antifraud_score'), isNil),
  always(LIMITER),
  applySpec({
    recommendation: antifraudRecommendation,
    score: propOr(LIMITER, 'antifraud_score'),
  })
)

const getCustomerSubProp = subProp => pathOr(LIMITER, ['customer', subProp])

const isEmptyCustomerProp = propName => pipe(
  getCustomerSubProp(propName),
  isNil
)

const formatPhoneNumber = (number) => {
  if (!number) return ''
  const len = length(number) - 4
  return join('-', splitAt(len, number))
}

const formatPhoneProp = pipe(
  propOr(LIMITER, ['ddd', 'number']),
  juxt([
    pipe(
      head,
      h => `(${h})`
    ),
    pipe(
      last,
      formatPhoneNumber
    ),
  ]),
  join(' ')
)

const getPhoneProp = pipe(
  propOr(LIMITER, 'phone'),
  ifElse(
    either(isNil, isEmpty),
    always(LIMITER),
    formatPhoneProp
  )
)

const phoneGroupsRegex = /(\+\d{2})(\d{2})(\d{4,5})(\d{4})/

const formatPhone = (phone) => {
  if (!phone) {
    return null
  }

  return replace(phoneGroupsRegex, '$1 ($2) $3-$4', phone)
}

const getFormatedPhones = pipe(
  getCustomerSubProp('phone_numbers'),
  unless(
    isNil,
    map(formatPhone)
  )
)

const getPhones = pipe(
  juxt([
    pipe(
      getPhoneProp,
      of
    ),
    getFormatedPhones,
  ]),
  flatten,
  reject(isNil)
)

const rejectInvalidDocument = reject(either(
  isNil,
  propSatisfies(isNil, 'number')
))

const getDocuments = pipe(
  propOr(LIMITER, 'customer'),
  juxt([
    pipe(
      applySpec({
        number: propOr(LIMITER, 'document_number'),
        type: propOr(LIMITER, 'document_type'),
      }),
      of
    ),
    propOr(LIMITER, 'documents'),
  ]),
  flatten,
  rejectInvalidDocument
)

const getAddress = ifElse(
  propSatisfies(isNil, 'address'),
  path(['billing', 'address']),
  propOr(LIMITER, 'address')
)

const getCustomerProp = ifElse(
  pipe(propOr(LIMITER, 'customer'), either(isNil, isEmpty)),
  always(LIMITER),
  applySpec({
    address: getAddress,
    birthday: pipe(
      ifElse(
        isEmptyCustomerProp('born_at'),
        getCustomerSubProp('birthday'),
        getCustomerSubProp('born_at')
      ),
      stringToMoment
    ),
    country: getCustomerSubProp('country'),
    created_at: getCustomerSubProp('date_created'),
    documents: getDocuments,
    email: getCustomerSubProp('email'),
    external_id: getCustomerSubProp('external_id'),
    id: getCustomerSubProp('id'),
    individual: getCustomerSubProp('individual'),
    name: getCustomerSubProp('name'),
    object: getCustomerSubProp('object'),
    phones: getPhones,
  })
)

const getCaptureMethod = ifElse(
  pipe(
    getCardProp('capture_method'),
    isNil
  ),
  propOr(LIMITER, 'capture_method'),
  getCardProp('capture_method')
)

const transactionSpec = {
  amount: propOr(LIMITER, 'amount'),
  antifraud: getAntifraudProp,
  brand_name: getCardProp('brand'),
  capture_method: getCaptureMethod,
  documents: propOr(LIMITER, 'document_number'),
  email: getCustomerSubProp('email'),
  id: unless(isNil, pipe(propOr(LIMITER, 'tid'), String)),
  ip: propOr(LIMITER, 'ip'),
  name: getCustomerSubProp('name'),
  paid_amount: propOr(LIMITER, 'paid_amount'),
  payment_method: propOr(LIMITER, 'payment_method'),
  refund_amount: propOr(LIMITER, 'refunded_amount'),
  risk_level: propOr(LIMITER, 'risk_level'),
  status: propOr(LIMITER, 'status'),
  status_reason: ifElse(
    propEq('status', 'refused'),
    propOr(LIMITER, 'refuse_reason'),
    propOr(LIMITER, 'status_reason')
  ),
  subscription: propOr(LIMITER, 'subscription_id'),
  updated_at: propOr(LIMITER, 'date_updated'),
}

export {
  getAntifraudProp,
  getCustomerProp,
  getCardProp,
  isInternational,
  transactionSpec,
}
