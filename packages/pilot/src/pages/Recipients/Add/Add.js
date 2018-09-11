import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { compose } from 'ramda'

import AddRecipient from '../../../../src/containers/AddRecipient'

const mapStateToProps = ({
  account: { client },
}) => ({ client })

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

  /* eslint-disable class-methods-use-this, no-console */

  // TODO: voltar para a rota /recipients
  onExit () {
    console.log('onExit')
  }

  // TODO: ir para para a rota /recipients/details/:id
  onViewDetails (recipient) {
    console.log('onViewDetails', recipient)
  }

  // TODO: fazer o cadastro do novo recebedor pela API
  submitRecipient (recipient) {
    console.log('submitRecipient', recipient)
    return Promise.resolve({ id: 1 })
  }

  /* eslint-enable class-methods-use-this, no-console */

  fetchAccounts (document) {
    return this.props.client.recipient.bankAccount(document)
  }

  render () {
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
      bankAccount: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(AddRecipientPage)
