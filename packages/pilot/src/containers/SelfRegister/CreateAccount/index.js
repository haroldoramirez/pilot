import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  FormInput,
} from 'former-kit'
import {
  always,
  equals,
  F,
  ifElse,
} from 'ramda'
import Form from 'react-vanilla-form'

import HeaderImage from '../../../components/SelfRegister/HeaderImage'
import Message from '../../../components/Message'
import requiredValidation from '../../../validation/required'
import style from '../style.css'
import { onFormMaskFieldChange } from '../formMaskFieldHelpers'

const equalsString = (t, str1) => ifElse(
  equals(str1),
  F,
  always(t('pages.self_register.different_passwords_error'))
)

const step = 'create-account'

class SelfRegisterCreateAccount extends Component {
  constructor (props) {
    super(props)

    this.state = {
      formData: {
        password: '',
        ...props.registerData,
      },
    }

    this.handleFormChange = onFormMaskFieldChange.bind(this)
  }

  render () {
    const { onSubmit, t } = this.props
    const { password } = this.state.formData

    const isRequired = requiredValidation(t('pages.self_register.required_error'))

    return (
      <Fragment>
        <Message
          image={<HeaderImage step={step} />}
          message={
            <span className={style.headerBody}>
              {t('pages.self_register.create_account.attraction')}
            </span>
          }
          title={
            <p className={style.headerTitle}>
              {t('pages.self_register.create_account.welcome')}
            </p>
          }
        />

        <Form
          className={style.fillWidth}
          data={{
            ...this.state.formData,
          }}
          onChange={this.handleFormChange}
          onSubmit={onSubmit}
          validation={{
            email: isRequired,
            password: isRequired,
            confirmPassword: [isRequired, equalsString(t, password)],
          }}
        >
          <FormInput
            label={t('pages.self_register.create_account.email')}
            name="email"
          />

          <FormInput
            label={t('pages.self_register.create_account.password')}
            name="password"
            type="password"
          />

          <FormInput
            label={t('pages.self_register.create_account.confirm_password')}
            name="confirmPassword"
            type="password"
          />

          <span className={style.buttonSubmit}>
            <Button type="submit" size="huge" fill="gradient">
              {t('pages.self_register.create_account.continue')}
            </Button>
          </span>
        </Form>
      </Fragment>
    )
  }
}

SelfRegisterCreateAccount.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  registerData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

SelfRegisterCreateAccount.defaultProps = {
  registerData: {},
}

export default SelfRegisterCreateAccount
