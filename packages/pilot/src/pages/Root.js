import React, { Component } from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'

import {
  Route,
  withRouter,
  Switch,
} from 'react-router-dom'

import { connect } from 'react-redux'
import { compose, pipe, startsWith, tail } from 'ramda'

import { requestLogin } from './Account/actions'

import Account from './Account'
import LoggedArea from './LoggedArea'
import SelfRegister from './SelfRegister'

import environment from '../environment'

const mapStateToProps = ({
  account: {
    client,
    company,
    sessionId,
    user,
  },
}) =>
  ({
    client,
    company,
    sessionId,
    user,
  })

const mapDispatchToProps = {
  requestLogin,
}
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)
const parseQueryString = pipe(tail, qs.parse)

const getSessionId = (props, queryString) =>
  props.sessionId || queryString.session_id

class Root extends Component {
  componentDidMount () {
    const {
      client,
      location: { search: queryString },
    } = this.props

    const parsedQueryString = parseQueryString(queryString)
    const sessionId = getSessionId(this.props, parsedQueryString)

    if (!client && sessionId) {
      this.props.requestLogin({ session_id: sessionId, environment })
    }
  }

  render () {
    const {
      client,
      company,
      location: {
        pathname: path,
        search: queryString,
      },
      history,
      sessionId,
      user,
    } = this.props

    const parsedQueryString = parseQueryString(queryString)
    const redirect = parsedQueryString.redirect || '/'

    if (!client && sessionId) {
      return null
    }

    if (!client && !startsWith('/account', path)) {
      history.replace('/account/login')
      return null
    }

    if (!client) {
      return (
        <Switch>
          <Route path="/account/register" component={SelfRegister} />
          <Route path="/account" component={Account} />
        </Switch>
      )
    }

    if (user && startsWith('/account/login', path)) {
      history.replace(redirect)
      return null
    }

    if (!user && !company) {
      return null
    }

    return <LoggedArea />
  }
}

Root.propTypes = {
  client: PropTypes.object, // eslint-disable-line
  company: PropTypes.object, // eslint-disable-line
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
  requestLogin: PropTypes.func.isRequired,
  sessionId: PropTypes.string,
  user: PropTypes.object, // eslint-disable-line
}

Root.defaultProps = {
  client: null,
  company: null,
  sessionId: null,
  user: null,
}

export default enhance(Root)
