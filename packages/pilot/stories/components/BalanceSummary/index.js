import React from 'react'
import moment from 'moment'
import {
  CardContent,
  CardSection,
} from 'former-kit'

import Section from '../../Section'
import BalanceSummary from '../../../src/components/BalanceSummary'

const amount = {
  outcoming: {
    title: 'Total de entradas',
    value: 1400000,
    unity: 'R$',
  },
  outgoing: {
    title: 'Total de Saídas',
    value: -400000,
    unity: 'R$',
  },
  net: {
    title: 'Total Líquido',
    value: 1000000,
    unity: 'R$',
  },
}

const BalanceSummaryExample = () => (
  <Section>
    <CardSection>
      <CardContent>
        <BalanceSummary
          amount={amount}
          dates={{
            end: moment(),
            start: moment().subtract(4, 'days'),
          }}
        />
      </CardContent>
    </CardSection>
  </Section>
)

export default BalanceSummaryExample
