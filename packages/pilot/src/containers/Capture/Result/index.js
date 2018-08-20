import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Col,
  Grid,
  ModalActions,
  Row,
  Spacing,
} from 'former-kit'

import Property from '../../../components/Property'
import currency from '../../../formatters/currency'
import CaptureDetails from '../../../components/CaptureDetails'
import Message from '../../../components/Message'
import formatCardNumber from '../../../formatters/cardNumber'

import style from './style.css'

const Result = ({
  authorizedAmount,
  cardBrand,
  cardFirstDigits,
  cardLastDigits,
  customerName,
  customerEmail,
  image,
  installments,
  message,
  onViewTransaction,
  paidAmount,
  t,
}) => (
  <Fragment>
    <div className={style.image}>
      <Message
        image={image}
        message={message}
      />
    </div>
    <Grid>
      <CaptureDetails
        labels={{
          cardBrand: t('models.card.brand'),
          cardNumber: t('models.card.number'),
          customerName: t('models.customer.name'),
          customerEmail: t('models.customer.email'),
          installments: t('installments'),
        }}
        contents={{
          cardBrand,
          cardNumber: `${formatCardNumber(cardFirstDigits)} ${cardLastDigits}`,
          customerName,
          customerEmail,
          installments,
        }}
      />
      <Row>
        <Col palm={12} tablet={6} desk={6} tv={6}>
          <Property
            title={t('pages.transaction.header.card_amount')}
            value={currency(authorizedAmount)}
          />
        </Col>
        <Col palm={12} tablet={6} desk={6} tv={6}>
          <Property
            title={t('pages.transaction.paid_amount')}
            value={
              <span className={style.capturedAmount}>
                {currency(paidAmount)}
              </span>
            }
          />
        </Col>
      </Row>
    </Grid>
    <Spacing />
    <ModalActions>
      <Button
        fill="outline"
        onClick={onViewTransaction}
      >
        {t('view_transaction')}
      </Button>
    </ModalActions>
  </Fragment>
)

Result.propTypes = {
  authorizedAmount: PropTypes.number.isRequired,
  cardBrand: PropTypes.string,
  cardFirstDigits: PropTypes.string,
  cardLastDigits: PropTypes.string,
  customerName: PropTypes.string,
  customerEmail: PropTypes.string,
  image: PropTypes.node.isRequired,
  installments: PropTypes.number,
  message: PropTypes.node.isRequired,
  onViewTransaction: PropTypes.func.isRequired,
  paidAmount: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
}

Result.defaultProps = {
  cardBrand: null,
  cardFirstDigits: null,
  cardLastDigits: null,
  customerName: null,
  customerEmail: null,
  installments: 0,
}

export default Result
