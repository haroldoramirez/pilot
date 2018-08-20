import React from 'react'
import { Card } from 'former-kit'

import Section from '../../Section'
import CaptureDetails from '../../../src/components/CaptureDetails'

const contents = {
  captureAmount: '10,00',
  amount: '10,00',
  cardBrand: 'Visa',
  cardNumber: '4111 **** **** 1111',
  customerEmail: 'johndoe@email.com',
  customerName: 'John Doe',
  installments: 1,
}

const labels = {
  captureAmount: 'Valor a ser capturado',
  amount: 'Valor autorizado',
  cardBrand: 'Bandeira',
  cardNumber: 'Número do cartão',
  customerEmail: 'Email',
  customerName: 'Nome',
  installments: 'Número de parcelas',
}

const CaptureDetailsExample = () => (
  <Section>
    <Card>
      <CaptureDetails
        contents={contents}
        labels={labels}
      />
    </Card>
  </Section>
)

export default CaptureDetailsExample
