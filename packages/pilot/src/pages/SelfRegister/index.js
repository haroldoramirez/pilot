import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { merge } from 'ramda'
import createCompany from './createCompany'
import SelfRegister from '../../containers/SelfRegister/'
import {
  firstContainers,
  lastContainers,
  containersFlowForward,
  containersFlowPrevious,
} from './containersFlow'

class PageSelfRegister extends Component {
  constructor () {
    super()

    this.state = {
      step: 'create-account',
      // step: 'partner-data-part-2',
      data: {},
    }

    this.inFirstContainer = this.inFirstContainer.bind(this)
    this.isLastPage = this.inLastContainer.bind(this)
    this.actionOnPreviousButton = this.actionOnPreviousButton.bind(this)
    this.actionSubitButton = this.actionSubitButton.bind(this)
  }

  inFirstContainer () {
    const { step } = this.state

    return step === firstContainers
  }

  inLastContainer () {
    const { step } = this.state

    return step === lastContainers
  }

  actionOnPreviousButton () {
    if (this.inFirstContainer()) {
      window.location = 'http://pagar.me/landing-page-pagar-me'
    } else {
      const previousPage = containersFlowPrevious[this.state.step]

      this.setState({
        step: previousPage,
      })
    }
  }

  actionSubitButton (newData, errors) {
    if (errors != null) {
      return
    }

    const { data } = this.state
    const updatedData = merge(data, newData)

    const nextStep = containersFlowForward[this.state.step]

    this.setState({
      step: (typeof nextStep === 'function' ? nextStep(newData) : nextStep),
      data: updatedData,
    })

    if (this.inLastContainer()) {
      createCompany(data)
        .then((result) => {
          console.log(result)

          const { onCompanyCreated } = this.props
          onCompanyCreated(data)
        })
        .catch((e) => {
          // TODO: Se tiver tido erro interno, deve ser exibido uma mensagem

          // TODO: Se tiver tido erro nas validações dos campos, o que deve acontecer?
          console.log('catch error!')
          console.log(e)
        })
    }
  }

  render () {
    const { onRedirectToHome, t } = this.props
    const { step } = this.state

    return (
      // TODO: Deve ser passado o state.data para ele poder preencher os campos já escrito
      <SelfRegister
        onPreviousButton={this.actionOnPreviousButton}
        onRedirectToHome={onRedirectToHome}
        onSubmit={this.actionSubitButton}
        step={step}
        t={t}
      />
    )
  }
}

PageSelfRegister.propTypes = {
  onCompanyCreated: PropTypes.func.isRequired,
  onRedirectToHome: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default PageSelfRegister
