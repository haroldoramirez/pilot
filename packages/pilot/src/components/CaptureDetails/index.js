import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { mapObjIndexed } from 'ramda'
import {
  Col,
  Row,
} from 'former-kit'

import Property from '../Property'

const fields = (labels, contents) => mapObjIndexed((label, key) => (
  <Property
    title={label}
    value={contents[key]}
  />
), labels)

const CaptureDetails = ({
  contents, labels,
}) => {
  const {
    cardBrand,
    cardNumber,
    customerEmail,
    customerName,
    installments,
  } = fields(labels, contents)

  return (
    <Fragment>
      { (customerName || customerEmail) &&
        <Row>
          <Col palm={12} tablet={8} desk={8} tv={8}>
            {customerName}
          </Col>
          <Col palm={12} tablet={4} desk={4} tv={4}>
            {customerEmail}
          </Col>
        </Row>
      }
      { cardNumber &&
        <Row>
          <Col palm={12} tablet={4} desk={4} tv={4}>
            {cardNumber}
          </Col>
          <Col palm={12} tablet={5} desk={5} tv={5}>
            {cardBrand}
          </Col>
          <Col palm={12} tablet={1} desk={1} tv={1}>
            {installments}
          </Col>
        </Row>
      }
    </Fragment>
  )
}

CaptureDetails.propTypes = {
  labels: PropTypes.shape({
    cardBrand: PropTypes.string.isRequired,
    cardNumber: PropTypes.string.isRequired,
    customerEmail: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    installments: PropTypes.string.isRequired,
  }).isRequired,
  contents: PropTypes.shape({
    cardBrand: PropTypes.node,
    cardNumber: PropTypes.node,
    customerEmail: PropTypes.node,
    customerName: PropTypes.node,
    installments: PropTypes.node,
  }).isRequired,
}

export default CaptureDetails
