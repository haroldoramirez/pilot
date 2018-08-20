import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Col,
  FormInput,
  Grid,
  ModalActions,
  ModalContent,
  Row,
  Spacing,
} from 'former-kit'
import Form from 'react-vanilla-form'

import Property from '../../../components/Property'
import currency from '../../../formatters/currency'
import CaptureDetails from '../../../components/CaptureDetails'
import CurrencyInput from '../../../components/CurrencyInput'
import formatCardNumber from '../../../formatters/cardNumber'
import numberValidation from '../../../validation/number'
import requiredValidation from '../../../validation/required'
import greaterThanValidation from '../../../validation/greaterThan'
import lessThanOrEqualValidation from '../../../validation/lessThanOrEqual'

import style from './style.css'

const isRequired = t => requiredValidation(t('pages.required_error'))
const isNumber = t => numberValidation(t('pages.capture.number'))

const greaterThanAuthorized = (authorizedAmount, t) =>
  greaterThanValidation(authorizedAmount, t('pages.capture.invalid_amount'))
const lessThanOrEqualZero = t =>
  lessThanOrEqualValidation(0, t('pages.capture.greater_than_zero'))

const CaptureForm = ({
  authorizedAmount,
  cardBrand,
  cardFirstDigits,
  cardLastDigits,
  captureAmount,
  customerName,
  customerEmail,
  isFromCheckout,
  installments,
  loading,
  onConfirm,
  onChange,
  t,
}) => {
  const labels = {
    amount: t('pages.transaction.header.card_amount'),
    captureAmount: t('pages.capture.value_to_capture'),
    cardBrand: t('models.card.brand'),
    cardNumber: t('models.card.number'),
    customerName: t('models.customer.name'),
    customerEmail: t('models.customer.email'),
    installments: t('installments'),
  }

  const contents = {
    cardBrand,
    cardNumber: `${formatCardNumber(cardFirstDigits)} ${cardLastDigits}`,
    customerName,
    customerEmail,
    installments,
  }

  return (
    <Form
      data={{
        captureAmount,
      }}
      validation={{
        captureAmount: [
          isRequired(t),
          isNumber(t),
          greaterThanAuthorized(authorizedAmount, t),
          lessThanOrEqualZero(t),
        ],
      }}
      onSubmit={onConfirm}
    >
      <ModalContent>
        <Grid>
          <CaptureDetails labels={labels} contents={contents} />
          <Row>
            <Col palm={12} tablet={8} desk={8} tv={8}>
              <Property
                title={t('pages.transaction.header.card_amount')}
                value={currency(authorizedAmount)}
              />
            </Col>
            <Col palm={12} tablet={4} desk={4} tv={4}>
              { isFromCheckout
                ? (
                  <span className={style.captureAmount}>
                    {currency(captureAmount)}
                  </span>
                  )
                : (
                  <FormInput
                    disabled={loading}
                    label={t('pages.transaction.paid_amount')}
                    name="captureAmount"
                    onChange={onChange}
                    renderer={props => (
                      <CurrencyInput
                        {...props}
                      />
                    )}
                    type="text"
                    value={captureAmount}
                  />
                  )
              }
            </Col>
          </Row>
        </Grid>
      </ModalContent>
      <Spacing />
      <ModalActions>
        <Button
          disabled={loading}
          type="submit"
        >
          {t('pages.capture.capture_action')}
        </Button>
      </ModalActions>
    </Form>
  )
}

CaptureForm.propTypes = {
  authorizedAmount: PropTypes.number.isRequired,
  cardBrand: PropTypes.string,
  cardFirstDigits: PropTypes.string,
  cardLastDigits: PropTypes.string,
  captureAmount: PropTypes.string.isRequired,
  customerName: PropTypes.string,
  customerEmail: PropTypes.string,
  isFromCheckout: PropTypes.bool.isRequired,
  installments: PropTypes.number,
  loading: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

CaptureForm.defaultProps = {
  cardBrand: null,
  cardFirstDigits: null,
  cardLastDigits: null,
  customerName: null,
  customerEmail: null,
  installments: null,
  loading: false,
}

export default CaptureForm
