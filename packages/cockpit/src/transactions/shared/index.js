import {
  allPass,
  always,
  apply,
  applySpec,
  complement,
  cond,
  equals,
  has,
  ifElse,
  is,
  isNil,
  juxt,
  path,
  pathSatisfies,
  pipe,
  prop,
  propEq,
  propOr,
  props,
  subtract,
  sum,
  T,
  unless,
  when,
} from 'ramda'

import moment from 'moment'

const isInternational = complement(equals)('BRAZIL')

const isAntifraudScoreNil = pipe(
  prop('antifraud_score'),
  isNil
)

const isRefuseReasonNil = pipe(
  prop('refuse_reason'),
  isNil
)

const getCardProp = subProp => cond([
  [
    pipe(
      prop('card'),
      allPass([is(Object), has(subProp)])
    ),
    path(['card', subProp]),
  ],
  [has(`card_${subProp}`), prop(`card_${subProp}`)],
  [T, always(null)],
])

const isRefuseReasonAntifraud = pipe(
  prop('refuse_reason'),
  equals('antifraud')
)

const antifraudRecommendation = cond([
  [isAntifraudScoreNil, always(null)],
  [isRefuseReasonNil, always(null)],
  [isRefuseReasonAntifraud, always('refused')],
  [T, always('approved')],
])

const getAntifraudProp = ifElse(
  pipe(prop('antifraud_score'), isNil),
  always(null),
  applySpec({
    recommendation: antifraudRecommendation,
    score: prop('antifraud_score'),
  })
)

const getCustomerSubProp = subProp => ifElse(
  pathSatisfies(complement(isNil), ['customer', subProp]),
  path(['customer', subProp]),
  always(null)
)

const getCustomerProp = ifElse(
  pipe(prop('customer'), isNil),
  always(null),
  applySpec({
    name: getCustomerSubProp('name'),
    document_number: getCustomerSubProp('document_number'),
    document_type: getCustomerSubProp('document_type'),
    email: getCustomerSubProp('email'),
    birth_date: pipe(getCustomerSubProp('birthday'), unless(isNil, moment.utc)),
    country: getCustomerSubProp('country'),
    phones: getCustomerSubProp('phone_numbers'),
  })
)

const buildCard = when(
  has('card_holder_name'),
  applySpec({
    brand_name: getCardProp('brand'),
    capture_method: getCardProp('capture_method'),
    first_digits: getCardProp('first_digits'),
    holder_name: getCardProp('holder_name'),
    international: pipe(getCardProp('country'), isInternational),
    last_digits: getCardProp('last_digits'),
    pin_mode: getCardProp('pin_mode'),
  })
)

const transactionSpec = {
  acquirer: {
    name: prop('acquirer_name'),
    response_code: prop('acquirer_response_code'),
    sequence_number: unless(isNil, pipe(prop('nsu'), String)),
    transaction_id: unless(isNil, pipe(prop('tid'), String)),
  },
  amount: prop('amount'),
  antifraud: getAntifraudProp,
  boleto: ifElse(
    propEq('payment_method', 'boleto'),
    applySpec({
      barcode: prop('boleto_barcode'),
      due_date: pipe(prop('boleto_expiration_date'), unless(isNil, moment)),
      url: prop('boleto_url'),
    }),
    always(null)
  ),
  card: buildCard,
  created_at: pipe(prop('date_created'), unless(isNil, moment)),
  customer: getCustomerProp,
  external_id: propOr(null, 'reference_key'),
  id: prop('id'),
  metadata: prop('metadata'),
  payment: {
    cost_amount: prop('cost'),
    installments: prop('installments'),
    method: prop('payment_method'),
    net_amount: pipe(
      juxt([
        prop('paid_amount'),
        pipe(
          props(['cost', 'refunded_amount']),
          sum
        ),
      ]),
      apply(subtract)
    ),
    paid_amount: prop('paid_amount'),
    refund_amount: prop('refunded_amount'),
  },
  risk_level: prop('risk_level'),
  soft_descriptor: prop('soft_descriptor'),
  status: prop('status'),
  status_reason: ifElse(
    propEq('status', 'refused'),
    prop('refuse_reason'),
    prop('status_reason')
  ),
  updated_at: pipe(prop('date_updated'), unless(isNil, moment)),
}

export {
  getAntifraudProp,
  getCustomerProp,
  getCardProp,
  isInternational,
  transactionSpec,
}
