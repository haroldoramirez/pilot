import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  FormInput,
} from 'former-kit'
import Form from 'react-vanilla-form'

import { handleMaskField } from '../formMaskFieldHelpers'
import HeaderImage from '../../../components/SelfRegister/HeaderImage'
import Message from '../../../components/Message'
import requiredValidation from '../../../validation/required'
import style from '../style.css'

const step = 'type-cnpj'

const isRequired = t => requiredValidation(t('pages.self_register.required_error'))

class SelfRegisterTypeCNPJ extends Component {
  constructor () {
    super()

    this.state = {
      cnpj: '',
    }

    this.handleMaskField = handleMaskField.bind(this)
  }

  render () {
    const { onSubmit, t } = this.props

    return (
      <Fragment>
        <Message
          image={<HeaderImage step={step} />}
          message={
            <div className={style.headerBody}>
              <p>{t('pages.self_register.type_cnpj.description_part_1')}</p>
              <p>{t('pages.self_register.type_cnpj.description_part_2')}</p>
            </div>
          }
          title={
            <p className={style.headerTitle}>
              {t('pages.self_register.type_cnpj.question')}
            </p>
          }
        />

        <Form
          className={style.fillWidth}
          data={{
            cnpj: this.state.cnpj,
          }}
          onSubmit={onSubmit}
          validateOn="blur"
          validation={{
            cnpj: isRequired(t),
          }}
        >
          <FormInput
            label={t('pages.self_register.type_cnpj.cnpj')}
            mask="11.111.111/1111-11"
            name="cnpj"
            onChange={this.handleMaskField('cnpj')}
          />
          <span className={style.buttonSubmit}>
            <Button type="submit" size="huge" fill="gradient">
              {t('pages.self_register.type_cnpj.continue')}
            </Button>
          </span>
        </Form>
      </Fragment>
    )
  }
}

SelfRegisterTypeCNPJ.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default SelfRegisterTypeCNPJ
