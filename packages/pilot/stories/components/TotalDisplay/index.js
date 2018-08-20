import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Row,
  Col,
} from 'former-kit'

import IconInfo from 'emblematic-icons/svg/Info24.svg'

import Section from '../../Section'
import TotalDisplay from '../../../src/components/TotalDisplay'

const TotalDisplayExample = ({ totals }) => (
  <Fragment>
    <Section>
      <Grid>
        <Row>
          <Col palm={12} tablet={12} desk={12}>
            <TotalDisplay
              align={totals.captured.align}
              amount={1000000000}
              amountSize={totals.captured.amountSize}
              color={totals.captured.color}
              subtitle={
                <span>
                  Capturado em 10/03/2018 às 14:15h
                </span>
              }
              title="Valor Capturado"
              titleColor={totals.captured.titleColor}
              titleSize={totals.captured.titleSize}
            />
          </Col>
        </Row>

        <Row>
          <Col palm={12} tablet={12} desk={12}>
            <TotalDisplay
              align={totals.outgoing.align}
              amount={-500000}
              amountSize={totals.outgoing.amountSize}
              color={totals.outgoing.color}
              subtitle={
                <span>
                  MDR: R$ 6,00 | Valor estornado: R$ 15,00 <br />
                  Outras saídas: R$ 0,75 <IconInfo width={12} height={12} />
                </span>
              }
              title="Total de Saídas"
              titleColor={totals.outgoing.titleColor}
              titleSize={totals.outgoing.titleSize}
            />
          </Col>
        </Row>

        <Row>
          <Col palm={12} tablet={12} desk={12}>
            <TotalDisplay
              align={totals.net.align}
              amount={9995000000}
              amountSize={totals.net.amountSize}
              color={totals.net.color}
              subtitle={
                <span>
                  Data a receber: 20/03/2018
                </span>
              }
              title="Valor Líquido"
              titleColor={totals.net.titleColor}
              titleSize={totals.net.titleSize}
            />
          </Col>
        </Row>
      </Grid>
    </Section>
  </Fragment>
)

TotalDisplayExample.propTypes = {
  totals: PropTypes.shape({
    captured: PropTypes.shape({
      align: PropTypes.string.isRequired,
      amountSize: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      titleColor: PropTypes.string.isRequired,
      titleSize: PropTypes.string.isRequired,
    }).isRequired,
    net: PropTypes.shape({
      align: PropTypes.string.isRequired,
      amountSize: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      titleColor: PropTypes.string.isRequired,
      titleSize: PropTypes.string.isRequired,
    }).isRequired,
    outgoing: PropTypes.shape({
      align: PropTypes.string.isRequired,
      amountSize: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      titleColor: PropTypes.string.isRequired,
      titleSize: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default TotalDisplayExample
