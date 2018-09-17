import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { compose } from 'ramda'

import AddRecipient from '../../../../src/containers/AddRecipient'

const mapStateToProps = (state) => {
  const { account } = state
  const { client, company } = account
  const { anticipation_config: anticipationConfig } = company || {}
  const {
    config_anticipation_params: canConfigureAnticipation,
    minimum_delay: minimumAnticipationDays,
  } = anticipationConfig || {}

  return {
    client,
    canConfigureAnticipation,
    minimumAnticipationDays,
  }
}

const enhanced = compose(
  translate(),
  connect(mapStateToProps)
)

class AddRecipientPage extends Component {
  constructor (props) {
    super(props)

    this.fetchAccounts = this.fetchAccounts.bind(this)
    this.onExit = this.onExit.bind(this)
    this.onViewDetails = this.onViewDetails.bind(this)
    this.submitRecipient = this.submitRecipient.bind(this)
  }

  /* eslint-disable class-methods-use-this */

  // TODO: voltar para a rota /recipients
  onExit () {
    console.log('onExit')
  }

  // TODO: ir para para a rota /recipients/details/:id
  onViewDetails (recipient) {
    console.log('onViewDetails', recipient)
  }

  /* eslint-enable class-methods-use-this */

  submitRecipient (recipient) {
    return this.props.client.recipient.add(recipient)
  }

  fetchAccounts (document) {
    return this.props.client.recipient.bankAccount(document)
  }

  render () {
    // TODO: Não mostrar 10/25 e d+x se a company não puder configurar d+x
    // (config_anticipation_params)
    // TODO: Prazo de recebimento d+x tem um valor minimo (minimum_delay)
    /* eslint-disable no-console */
    console.log('canConfigureAnticipation', this.props.canConfigureAnticipation)
    console.log('minimumAnticipationDays', this.props.minimumAnticipationDays)
    /* eslint-enable no-console */

    return (
      <AddRecipient
        fetchAccounts={this.fetchAccounts}
        onExit={this.onExit}
        onViewDetails={this.onViewDetails}
        submitRecipient={this.submitRecipient}
        t={this.props.t}
      />
    )
  }
}

AddRecipientPage.propTypes = {
  client: PropTypes.shape({
    recipient: PropTypes.shape({
      add: PropTypes.func.isRequired,
      bankAccount: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  canConfigureAnticipation: PropTypes.bool,
  minimumAnticipationDays: PropTypes.number,
  t: PropTypes.func.isRequired,
}

AddRecipientPage.defaultProps = {
  canConfigureAnticipation: true,
  minimumAnticipationDays: 15,
}

export default enhanced(AddRecipientPage)
