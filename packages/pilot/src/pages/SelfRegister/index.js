import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  compose,
  equals,
  merge,
  pipe,
  type,
} from 'ramda'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import createCompany from 'cockpit/src/company/register'
import SelfRegister from '../../containers/SelfRegister/'
import {
  firstContainers,
  lastContainers,
  containersFlowForward,
  containersFlowPrevious,
} from './containersFlow'


const enhanced = compose(
  translate(),
  withRouter
)

const isFunction = pipe(
  type,
  equals('Function')
)

class PageSelfRegister extends Component {
  constructor () {
    super()

    this.state = {
      registerData: {
        email: 'foo@bar.com',
      },
      step: 'create-account',
    }

    this.actionOnPreviousButton = this.actionOnPreviousButton.bind(this)
    this.actionSubitButton = this.actionSubitButton.bind(this)
    this.inFirstContainer = this.inFirstContainer.bind(this)
    this.isLastPage = this.inLastContainer.bind(this)
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
      return
    }

    const previousStep = containersFlowPrevious[this.state.step]

    if (isFunction(previousStep)) {
      const { registerData } = this.state

      this.setState({
        step: previousStep(registerData),
      })
    } else {
      const previousPage = containersFlowPrevious[this.state.step]

      this.setState({
        step: previousPage,
      })
    }
  }

  actionSubitButton (newRegisterData, errors) {
    if (errors != null) {
      return
    }

    const { registerData } = this.state
    const updatedData = merge(registerData, newRegisterData)

    const nextStep = containersFlowForward[this.state.step]

    this.setState({
      step: (
        isFunction(nextStep)
          ? nextStep(newRegisterData)
          : nextStep
      ),
      registerData: updatedData,

    })
    if (this.inLastContainer()) {
      const {
        history,
      } = this.props
      createCompany
        .register(registerData)
        .then((result) => {
          console.log(result)
          history.redirect()
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
    const {
      registerData,
      step,
    } = this.state

    return (
      <SelfRegister
        flowData={registerData}
        onPreviousButton={this.actionOnPreviousButton}
        onRedirectToHome={this.handleHomeRedirect}
        onSubmit={this.actionSubitButton}
        step={step}
        t={this.props.t}
      />
    )
  }
}

PageSelfRegister.propTypes = {
  history: PropTypes.shape({
    redirect: PropTypes.func.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(PageSelfRegister)
