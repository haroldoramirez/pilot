import React from 'react'
import { action } from '@storybook/addon-actions'
import PropTypes from 'prop-types'

import Capture from '../../../src/containers/Capture'

const CaptureExample = ({ stepStatus }) => (
  <Capture
    captureAmount="1000"
    isFromCheckout={false}
    isOpen
    onCancel={action('cancel')}
    onChange={action('onChange')}
    onConfirm={action('confirm')}
    onViewTransaction={action('viewTransaction')}
    stepStatus={stepStatus}
    t={string => string}
    transaction={{
      authorized_amount: 1000,
      paid_amount: 1000,
      installments: 1,
      capabilities: {
        capturable: true,
      },
      card: {
        brand: 'Mastercard',
        first_digits: '4111',
        last_digits: '1111',
      },
      payment_method: 'credit_card',
      customer: {
        name: 'John Doe',
        email: 'johndoe@email.com',
      },
    }}
  />
)

CaptureExample.propTypes = {
  stepStatus: PropTypes.shape({
    confirmation: PropTypes.oneOf([
      'current', 'error', 'pending', 'success',
    ]),
    result: PropTypes.oneOf([
      'current', 'error', 'pending', 'success',
    ]),
  }),
}

CaptureExample.defaultProps = {
  stepStatus: {
    confirmation: 'current',
    result: 'pending',
  },
}

export default CaptureExample
