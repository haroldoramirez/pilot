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
import { createCompany } from 'cockpit'
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
        email: '',
      },
      step: 'create-account',
    }

    this.handleHomeRedirect = this.handleHomeRedirect.bind(this)
    this.handleOnBack = this.handleOnBack.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleOnBack () {
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

  handleSubmit (newRegisterData, errors) {
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
      createCompany(registerData)
        .then((result) => {
          if (result.ok) {
            return history.replace('roda de ok')
          }
          throw result
        })
        .catch((e) => {
          // TODO: When an internal error shows up a message must be shown
          // TODO: The API validation ERROS must be handled here
          // history.replace('roda de erro')
          console.log(e)
        })
    }
  }

  handleHomeRedirect () {
    // TODO: validate the home route
    this.props.history.replace('home route')
  }

  render () {
    const {
      registerData,
      step,
    } = this.state

    return (
      <SelfRegister
        registerData={registerData}
        onPreviousButton={this.handleOnBack}
        onRedirectToHome={this.handleHomeRedirect}
        onSubmit={this.handleSubmit}
        step={step}
        t={this.props.t}
      />
    )
  }
}

PageSelfRegister.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(PageSelfRegister)
