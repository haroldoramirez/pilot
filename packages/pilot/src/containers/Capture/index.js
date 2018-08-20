import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalContent,
  ModalSection,
  ModalTitle,
  Spacing,
  Steps,
} from 'former-kit'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'
import ErrorIcon from '../../components/TransferError/ErrorIcon.svg'

import CaptureForm from './Form'
import CaptureResult from './Result'

const Capture = ({
  captureAmount,
  isFromCheckout,
  isOpen,
  loading,
  onChange,
  onConfirm,
  onCancel,
  onViewTransaction,
  stepStatus,
  t,
  transaction,
}) => {
  const {
    authorized_amount: authorizedAmount,
    card,
    customer,
    installments,
    paid_amount: paidAmount,
  } = transaction

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
    >
      <ModalTitle
        closeIcon={<IconClose height={16} width={16} />}
        onClose={onCancel}
        title={t('pages.capture.title')}
      />
      <ModalContent>
        <ModalSection>
          <Steps
            status={[
              { id: 'confirmation', status: stepStatus.confirmation },
              { id: 'result', status: stepStatus.result },
            ]}
            steps={[
              { id: 'confirmation', title: t('pages.capture.confirmation') },
              { id: 'result', title: t('pages.capture.result') },
            ]}
          />
        </ModalSection>
        <Spacing />
        { stepStatus.confirmation === 'current' &&
          <CaptureForm
            authorizedAmount={authorizedAmount}
            captureAmount={captureAmount}
            cardBrand={card.brand}
            cardFirstDigits={card.first_digits}
            cardLastDigits={card.last_digits}
            customerName={customer.name}
            customerEmail={customer.email}
            disabled={loading}
            isFromCheckout={isFromCheckout}
            installments={installments}
            onChange={onChange}
            onConfirm={onConfirm}
            paidAmount={paidAmount}
            t={t}
          />
        }
        { stepStatus.result === 'current' &&
          <CaptureResult
            authorizedAmount={authorizedAmount}
            cardBrand={card.brand}
            cardFirstDigits={card.first_digits}
            cardLastDigits={card.last_digits}
            customerName={customer.name}
            customerEmail={customer.email}
            image={<ErrorIcon />}
            installments={installments}
            message={t('pages.capture.success')}
            onViewTransaction={onViewTransaction}
            paidAmount={paidAmount}
            t={t}
          />
        }
      </ModalContent>
    </Modal>
  )
}

Capture.propTypes = {
  captureAmount: PropTypes.string.isRequired,
  isFromCheckout: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onViewTransaction: PropTypes.func.isRequired,
  stepStatus: PropTypes.shape({
    confirmation: PropTypes.oneOf([
      'current', 'error', 'pending', 'success',
    ]),
    result: PropTypes.oneOf([
      'current', 'error', 'pending', 'success',
    ]),
  }),
  t: PropTypes.func.isRequired,
  transaction: PropTypes.shape({
    authorized_amount: PropTypes.number.isRequired,
    installments: PropTypes.number,
    card_first_digits: PropTypes.string,
    card_last_digits: PropTypes.string,
    card_brand: PropTypes.string,
    payment_method: PropTypes.string,
    customer: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }).isRequired,
}

Capture.defaultProps = {
  loading: false,
  stepStatus: {
    confirmation: 'current',
    result: 'pending',
  },
}

export default Capture
