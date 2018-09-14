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
import style from '../style.css'

const masks = {
  cpf: '111.111.111-11',
  date: '11/11/1111',
  phone: '(11) 11111-1111',
}

const step = 'partner-data'

const isRequired = t => requiredValidation(t('pages.self_register.required_error'))

class SelfRegisterPartnerData extends Component {
  constructor (props) {
    super(props)

    this.state = {
      formData: {
        ...props.registerData,
      },
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
          title={
            <p className={style.headerTitle}>
              {t('pages.self_register.partner_data.form_title')}
            </p>
          }
        />

        <Form
          className={style.fillWidth}
          data={{
            ...this.state.formData,
          }}
          onChange={this.onFormMaskFieldChange}
          onSubmit={onSubmit}
          validateOn="blur"
          validation={{
            partner_name: isRequired(t),
            birth_date: isRequired(t),
            cpf: isRequired(t),
            montherName: isRequired(t),
            phone: isRequired(t),
            email: isRequired(t),
          }}
        >
          <Grid>
            <Row>
              <Col tv={12} desk={12} tablet={12} palm={12}>
                <FormInput
                  label={t('pages.self_register.partner_data.partner_name')}
                  name="partner_name"
                />
              </Col>
            </Row>

            <Row>
              <Col tv={4} desk={4} tablet={5} palm={12}>
                <FormInput
                  label={t('pages.self_register.partner_data.birth_date')}
                  mask={masks.date}
                  name="birth_date"
                  onChange={this.handleMaskField('birth_date')}
                />
              </Col>
              <Col tv={8} desk={8} tablet={7} palm={12}>
                <FormInput
                  label={t('pages.self_register.partner_data.cpf')}
                  mask={masks.cpf}
                  name="cpf"
                  onChange={this.handleMaskField('cpf')}
                />
              </Col>
            </Row>

            <Row>
              <Col tv={12} desk={12} tablet={12} palm={12}>
                <FormInput
                  label={t('pages.self_register.partner_data.monther_name')}
                  name="montherName"
                />
              </Col>
            </Row>

            <Row>
              <Col tv={4} desk={4} tablet={5} palm={12}>
                <FormInput
                  label={t('pages.self_register.partner_data.phone')}
                  mask={masks.phone}
                  name="phone"
                  onChange={this.handleMaskField('phone')}
                />
              </Col>
              <Col tv={8} desk={8} tablet={7} palm={12}>
                <FormInput
                  label={t('pages.self_register.partner_data.email')}
                  name="email"
                />
              </Col>
            </Row>

            <span className={style.buttonSubmit}>
              <Button type="submit" size="huge" fill="gradient">
                {t('pages.self_register.partner_data.continue')}
              </Button>
            </span>
          </Grid>
        </Form>
      </Fragment>
    )
  }
}

SelfRegisterPartnerData.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  registerData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

SelfRegisterPartnerData.defaultProps = {
  registerData: {},
}

export default SelfRegisterPartnerData
