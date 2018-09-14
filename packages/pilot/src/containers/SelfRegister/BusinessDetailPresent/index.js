import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  FormDropdown,
  Col,
  Grid,
  Row,
} from 'former-kit'
import Form from 'react-vanilla-form'

import HeaderImage from '../../../components/SelfRegister/HeaderImage'
import Message from '../../../components/Message'
import optionsPlatforms from '../platforms.json'
import optionsSegments from '../segments.json'
import requiredValidation from '../../../validation/required'
import style from '../style.css'

const step = 'business-detail-present'

const SelfRegisterBusinessDetailPresent = ({ onSubmit, registerData, t }) => {
  const isRequired = requiredValidation(t('pages.self_register.required_error'))

  return (
    <Fragment>
      <Message
        image={<HeaderImage step={step} />}
        title={
          <p className={style.headerTitle}>
            {t('pages.self_register.business_detail_present.form_title')}
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
          platform: isRequired,
          segment: isRequired,
        }}
      >
        <Grid>
          <Row>
            <Col tv={12} desk={12} tablet={12} palm={12}>
              <FormDropdown
                name="platform"
                options={optionsPlatforms}
                placeholder={t('pages.self_register.business_detail_present.which_platform')}
              />
            </Col>
          </Row>

          <Row>
            <Col tv={12} desk={12} tablet={12} palm={12}>
              <FormDropdown
                name="segment"
                options={optionsSegments}
                placeholder={t('pages.self_register.business_detail_present.which_segment')}
              />
            </Col>
          </Row>

          <span className={style.buttonSubmit}>
            <Button type="submit" size="huge" fill="gradient">
              {t('pages.self_register.business_detail_present.continue')}
            </Button>
          </span>
        </Grid>
      </Form>
    </Fragment>
  )
}

SelfRegisterBusinessDetailPresent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  registerData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

SelfRegisterBusinessDetailPresent.defaultProps = {
  registerData: {},
}

export default SelfRegisterBusinessDetailPresent
