import React from 'react'
import { action } from '@storybook/addon-actions'

import CaptureForm from '../../../../src/containers/Capture/Form'

const CaptureFormExample = () => (
  <CaptureForm
    authorizedAmount={1000}
    captureAmount="0"
    cardBrand="Mastercard"
    cardFirstDigits="41414"
    cardLastDigits="4141"
    customerName="John Doe"
    customerEmail="johndoe@pagar.me"
    isFromCheckout={false}
    installments={1}
    onConfirm={action('onConfirm')}
    onChange={action('onChange')}
    t={string => string}
  />
)

const FixedCaptureFormExample = () => (
  <CaptureForm
    authorizedAmount={1000}
    captureAmount="1000"
    cardBrand="Mastercard"
    cardFirstDigits="41414"
    cardLastDigits="4141"
    customerName="John Doe"
    customerEmail="johndoe@pagar.me"
    installments={1}
    isFromCheckout
    onConfirm={action('onConfirm')}
    t={string => string}
  />
)

export {
  CaptureFormExample,
  FixedCaptureFormExample,
}
