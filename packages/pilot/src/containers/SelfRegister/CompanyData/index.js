import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  FormInput,
  Col,
  Grid,
  Row,
} from 'former-kit'
import Form from 'react-vanilla-form'

import { handleMaskField, onFormMaskFieldChange } from '../formMaskFieldHelpers'
import HeaderImage from '../../../components/SelfRegister/HeaderImage'
import Message from '../../../components/Message'
import requiredValidation from '../../../validation/required'
import style from './../style.css'

const step = 'company-data'

const isRequired = t => requiredValidation(t('pages.self_register.required_error'))

class SelfRegisterCompanyData extends Component {
  constructor () {
    super()

    this.state = {
      commercialPhone: '',
    }

    this.handleMaskField = handleMaskField.bind(this)
    this.onFormMaskFieldChange = onFormMaskFieldChange.bind(this)
  }

  render () {
    const { onSubmit, t } = this.props

    return (
      <Fragment>
        <Message
          image={<HeaderImage step={step} />}
          title={<p className={style.headerTitle}>{t('pages.self_register.company_data.form_title')}</p>}
        />

        <Form
          className={style.fillWidth}
          data={{
            ...this.state,
          }}
          onChange={this.onFormMaskFieldChange}
          onSubmit={onSubmit}
          validateOn="blur"
          validation={{
            tradeName: isRequired(t),
            legalName: isRequired(t),
            commercialPhone: isRequired(t),
          }}
        >
          <Grid>
            <Row>
              <Col tv={12} desk={12} tablet={12} palm={12}>
                <FormInput
                  label={t('pages.self_register.company_data.trade_name')}
                  name="tradeName"
                />
              </Col>
            </Row>

            <Row>
              <Col tv={12} desk={12} tablet={12} palm={12}>
                <FormInput
                  label={t('pages.self_register.company_data.legal_name')}
                  name="legalName"
                />
              </Col>
            </Row>

            <Row>
              <Col tv={6} desk={6} tablet={6} palm={6}>
                <FormInput
                  label={t('pages.self_register.company_data.commercial_phone')}
                  mask="(11) 11111-1111"
                  name="commercialPhone"
                  onChange={this.handleMaskField('commercialPhone')}
                />
              </Col>

              <Col tv={6} desk={6} tablet={6} palm={6}>
                <FormInput
                  label={t('pages.self_register.company_data.site')}
                  name="site"
                />
              </Col>
            </Row>

            <span className={style.buttonSubmit}>
              <Button type="submit" size="huge" fill="gradient">
                {t('pages.self_register.company_data.continue')}
              </Button>
            </span>
          </Grid>
        </Form>
      </Fragment>
    )
  }
}

SelfRegisterCompanyData.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default SelfRegisterCompanyData
