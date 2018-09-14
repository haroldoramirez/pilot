import React from 'react'
import PropTypes from 'prop-types'

import SelfRegisterForm from './Form'
import SelfRegisterWaiting from './Waiting'

const isForm = (step) => {
  const forms = [
    'create-account',
    'check-cnpj',
    'type-cnpj',
    'without-cnpj',
    'company-data',
    'partner-data',
    'partner-address',
    'already-sell',
    'business-detail-present',
    'business-detail-future',
    'sales-amount-present',
    'sales-amount-future',
    'contract',
  ]

  return forms.includes(step)
}

const SelfRegister = ({
  registerData,
  onPreviousButton,
  onRedirectToHome,
  onSubmit,
  step,
  t,
}) => {
  if (isForm(step)) {
    return (
      <SelfRegisterForm
        onPreviousButton={onPreviousButton}
        onRedirectToHome={onRedirectToHome}
        onSubmit={onSubmit}
        step={step}
        t={t}
      />
    )
  }

  return (
    <SelfRegisterWaiting
      registerData={registerData}
      onRedirectToHome={onRedirectToHome}
      step={step}
      t={t}
    />
  )
}

SelfRegister.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  registerData: PropTypes.object,
  onPreviousButton: PropTypes.func.isRequired,
  onRedirectToHome: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  step: PropTypes.oneOf([
    'create-account',
    'check-cnpj',
    'type-cnpj',
    'without-cnpj',
    'company-data',
    'partner-data',
    'partner-address',
    'already-sell',
    'business-detail-present',
    'business-detail-future',
    'sales-amount-present',
    'sales-amount-future',
    'contract',
    'waiting-creating',
    'refused-account',
  ]),
  t: PropTypes.func.isRequired,
}

SelfRegister.defaultProps = {
  registerData: {},
  step: 'create-account',
}

export default SelfRegister
