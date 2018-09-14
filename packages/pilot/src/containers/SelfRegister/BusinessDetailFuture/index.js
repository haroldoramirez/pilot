import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Col,
  FormDropdown,
  Grid,
  Row,
} from 'former-kit'
import Form from 'react-vanilla-form'

import HeaderImage from '../../../components/SelfRegister/HeaderImage'
import Message from '../../../components/Message'
import optionsSegments from '../segments.json'
import requiredValidation from '../../../validation/required'
import style from '../style.css'

const step = 'business-detail-future'

const SelfRegisterBusinessDetailFuture = ({ onSubmit, registerData, t }) => {
  const isRequired = requiredValidation(t('pages.self_register.required_error'))

  const translatePathOptionsSalesStarts = 'pages.self_register.business_detail_future.when_will_open_options'
  const optionsSalesStarts = [
    {
      name: t(`${translatePathOptionsSalesStarts}.is_still_a_project`),
      value: 'future',
    },
    {
      name: t(`${translatePathOptionsSalesStarts}.is_ready`),
      value: 'now',
    },
    {
      name: t(`${translatePathOptionsSalesStarts}.will_start_in_30_days`),
      value: '30days',
    },
    {
      name: t(`${translatePathOptionsSalesStarts}.will_start_in_60_days`),
      value: '60days',
    },
  ]

  return (
    <Fragment>
      <Message
        image={<HeaderImage step={step} />}
        title={
          <p className={style.headerTitle}>
            {t('pages.self_register.business_detail_future.form_title')}
          </p>
        }
      />

      <Form
        className={style.fillWidth}
        data={{
          ...registerData,
        }}
        onSubmit={onSubmit}
        validateOn="blur"
        validation={{
          salesStarts: isRequired,
          segment: isRequired,
        }}
      >
        <Grid>
          <Row>
            <Col tv={12} desk={12} tablet={12} palm={12}>
              <FormDropdown
                name="salesStarts"
                options={optionsSalesStarts}
                placeholder={t('pages.self_register.business_detail_future.when_will_open')}
              />
            </Col>
          </Row>

          <Row>
            <Col tv={12} desk={12} tablet={12} palm={12}>
              <FormDropdown
                name="segment"
                options={optionsSegments}
                placeholder={t('pages.self_register.business_detail_future.which_segment')}
              />
            </Col>
          </Row>

          <span className={style.buttonSubmit}>
            <Button type="submit" size="huge" fill="gradient">
              {t('pages.self_register.business_detail_future.continue')}
            </Button>
          </span>
        </Grid>
      </Form>
    </Fragment>
  )
}

SelfRegisterBusinessDetailFuture.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  registerData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

SelfRegisterBusinessDetailFuture.defaultProps = {
  registerData: {},
}

export default SelfRegisterBusinessDetailFuture
