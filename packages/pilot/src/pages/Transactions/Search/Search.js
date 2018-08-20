import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import qs from 'qs'
import {
  __,
  append,
  applySpec,
  assoc,
  compose,
  contains,
  defaultTo,
  either,
  identity,
  isEmpty,
  isNil,
  juxt,
  mergeAll,
  nth,
  objOf,
  path,
  pipe,
  prop,
  replace,
  tail,
  unless,
  without,
  when,
} from 'ramda'
import {
  requestSearch,
  receiveSearch,
} from './actions'
import { requestLogout } from '../../Account/actions'

import dateSelectorPresets from '../../../models/dateSelectorPresets'
import filterOptions from '../../../models/transactionFilterOptions'
import TransactionsList from '../../../containers/TransactionsList'

const mapStateToProps = ({
  account: { client },
  transactions: { loading, query },
}) => ({ client, loading, query })

const mapDispatchToProps = dispatch => ({
  onRequestSearch: (query) => {
    dispatch(requestSearch(query))
  },

  onReceiveSearch: ({ query }) => {
    dispatch(receiveSearch({ query }))
  },
  onRequestSearchFail: (error) => {
    dispatch(requestLogout(error))
  },
})

const enhanced = compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)

const momentToString = momentObj => momentObj.toISOString()

const normalizeDateToString = property => pipe(
  prop(property),
  unless(
    either(isNil, isEmpty),
    pipe(momentToString, objOf(property))
  )
)

const normalizeQueryDatesToString = pipe(
  prop('dates'),
  juxt([normalizeDateToString('start'), normalizeDateToString('end')]),
  mergeAll
)

const stringToMoment = str => moment(str)

const normalizeStringToDate = property => pipe(
  prop(property),
  unless(
    either(isNil, isEmpty),
    pipe(stringToMoment, objOf(property))
  )
)

const normalizeQueryStringToDate = pipe(
  prop('dates'),
  juxt([normalizeStringToDate('start'), normalizeStringToDate('end')]),
  mergeAll,
  objOf('dates')
)

const normalizeTo = (defaultValue, propPath) => pipe(
  path(propPath),
  when(
    either(isNil, isEmpty),
    defaultTo(defaultValue)
  )
)

const normalizeQueryStructure = applySpec({
  search: normalizeTo('', ['search']),
  filters: normalizeTo({}, ['filters']),
  offset: pipe(
    normalizeTo(1, ['offset']),
    Number
  ),
  count: pipe(
    normalizeTo(15, ['count']),
    Number
  ),
  sort: {
    order: normalizeTo('descending', ['sort', 'order']),
    field: normalizeTo(['created_at'], ['sort', 'field']),
  },
})

const parseQueryUrl = pipe(
  tail,
  qs.parse,
  juxt([
    identity,
    normalizeQueryStringToDate,
    normalizeQueryStructure,
  ]),
  mergeAll
)


class TransactionsSearch extends React.Component {
  constructor (props) {
    super(props)
    this.handleChartsCollapse = this.handleChartsCollapse.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handlePageCountChange = this.handlePageCountChange.bind(this)
    this.handleRowDetailsClick = this.handleRowDetailsClick.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
    this.handleExpandRow = this.handleExpandRow.bind(this)
    this.handleExport = this.handleExport.bind(this)
    this.handlePendingReviewsFilter = this.handlePendingReviewsFilter.bind(this)
    this.handleSelectRow = this.handleSelectRow.bind(this)
    this.requestData = this.requestData.bind(this)
    this.requestPendingReviewsCount = this.requestPendingReviewsCount.bind(this)

    this.state = {
      collapsed: true,
      result: {
        total: {},
        list: {
          rows: [],
        },
        chart: {
          dataset: [],
        },
      },
      expandedRows: [],
      pendingReviewsCount: 0,
      selectedRows: [],
      viewMode: 'table',
    }

    this.handleChartsCollapse = this.handleChartsCollapse.bind(this)
    this.handleExpandRow = this.handleExpandRow.bind(this)
    this.handleExport = this.handleExport.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleFilterClear = this.handleFilterClear.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handlePageCountChange = this.handlePageCountChange.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
    this.handleRowDetailsClick = this.handleRowDetailsClick.bind(this)
    this.handleSelectRow = this.handleSelectRow.bind(this)
    this.handleViewModeChange = this.handleViewModeChange.bind(this)

    this.requestData = this.requestData.bind(this)
  }

  componentDidMount () {
    const urlSearchQuery = this.props.history.location.search

    if (isEmpty(urlSearchQuery)) {
      this.updateQuery(this.props.query)
    } else {
      this.requestData(parseQueryUrl(urlSearchQuery))
    }

    this.requestPendingReviewsCount()
  }

  componentWillReceiveProps (nextProps) {
    const { location: { search } } = this.props // eslint-disable-line
    const { location } = nextProps

    if (search !== location.search) {
      this.requestData(parseQueryUrl(location.search))
    }
  }

  requestPendingReviewsCount () {
    const { client } = this.props

    return client
      .transactions
      .countPendingReviews()
      .then(({ count }) => {
        this.setState({
          pendingReviewsCount: count,
        })
      })
  }

  handlePendingReviewsFilter () {
    this.handleFilterChange({
      dates: {},
      search: '',
      filters: {
        status: ['pending_review'],
      },
      sort: {
        field: ['created_at'],
        order: 'ascending',
      },
    })
  }

  updateQuery (query) {
    const {
      history: {
        push,
        location,
      },
    } = this.props

    const buildSearchQuery = pipe(
      normalizeQueryDatesToString,
      assoc('dates', __, query),
      qs.stringify
    )

    const newQuery = buildSearchQuery(query)
    const currentQuery = replace('?', '', location.search)

    this.setState({
      expandedRows: [],
      selectedRows: [],
    })

    if (currentQuery !== newQuery) {
      push({
        pathname: 'transactions',
        search: newQuery,
      })
    }
  }

  requestData (query) {
    this.props.onRequestSearch({ query })

    return this.props.client
      .transactions
      .search(query)
      .then((res) => {
        this.setState(res)
        this.props.onReceiveSearch(res)
      })
      .catch((error) => {
        this.props.onRequestSearchFail(error)
      })
  }

  handlePageCountChange (count) {
    const query = {
      ...this.props.query,
      offset: 1,
      count,
    }

    this.updateQuery(query)
  }

  handleOrderChange (field, order) {
    const query = {
      ...this.props.query,
      sort: {
        field,
        order,
      },
      offset: 1,
    }

    this.updateQuery(query)
  }

  handleFilterClear () {
    const { dates } = this.props.query

    this.updateQuery({ dates })
  }

  handleFilterChange ({
    dates,
    filters,
    search,
    sort,
  }) {
    const query = {
      ...this.props.query,
      search,
      dates,
      sort: sort || this.props.query.sort,
      filters,
      offset: 1,
    }

    this.updateQuery(query)
  }

  handlePageChange (page) {
    const query = {
      ...this.props.query,
      offset: page,
    }

    this.updateQuery(query)
  }

  handleChartsCollapse () {
    const { collapsed } = this.state

    this.setState({
      collapsed: !collapsed,
    })
  }

  handleRowDetailsClick (rowIndex) {
    const { history } = this.props
    const rowData = nth(rowIndex, this.state.result.list.rows)
    const { id } = rowData
    history.push(`/transactions/${id}`)
  }

  handleRowClick (index) {
    const { expandedRows } = this.state
    this.setState({
      expandedRows: contains(index, expandedRows)
        ? without([index], expandedRows)
        : append(index, expandedRows),
    })
  }

  handleViewModeChange (viewMode) {
    this.setState({
      viewMode,
    })
  }

  handleExpandRow (expandedRows) {
    this.setState({
      expandedRows,
    })
  }

  handleExport () {

  }

  handleSelectRow (selectedRows) {
    this.setState({
      selectedRows,
    })
  }

  render () {
    const {
      collapsed,
      columns,
      expandedRows,
      pendingReviewsCount,
      result: {
        total,
        list,
        chart,
      },
      selectedRows,
      viewMode,
    } = this.state

    const {
      loading,
      query,
      query: {
        count,
        offset,
        sort,
      },
      t,
    } = this.props

    const pagination = {
      offset,
      total: Math.ceil(
        total.count / count
      ),
    }

    return (
      <TransactionsList
        amount={total.payment ? total.payment.paid_amount : 0}
        collapsed={collapsed}
        columns={columns}
        count={total.count}
        data={chart.dataset}
        dateSelectorPresets={dateSelectorPresets}
        expandedRows={expandedRows}
        filterOptions={filterOptions}
        onPendingReviewsFilter={this.handlePendingReviewsFilter}
        loading={loading}
        onChangeViewMode={this.handleViewModeChange}
        onChartsCollapse={this.handleChartsCollapse}
        onDetailsClick={this.handleRowDetailsClick}
        onExpandRow={this.handleExpandRow}
        onExport={this.handleExport}
        onFilterChange={this.handleFilterChange}
        onFilterClear={this.handleFilterClear}
        onOrderChange={this.handleOrderChange}
        onPageChange={this.handlePageChange}
        onPageCountChange={this.handlePageCountChange}
        onRowClick={this.handleRowClick}
        onSelectRow={this.handleSelectRow}
        order={sort.order}
        orderField={sort.field}
        pagination={pagination}
        pendingReviewsCount={pendingReviewsCount}
        rows={list.rows}
        selectedPage={count}
        selectedRows={selectedRows}
        query={query}
        viewMode={viewMode}
        t={t}
      />
    )
  }
}

TransactionsSearch.propTypes = {
  client: PropTypes.shape({
    transactions: PropTypes.shape({
      countPendingReviews: PropTypes.func.isRequired,
      search: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  onReceiveSearch: PropTypes.func.isRequired,
  onRequestSearch: PropTypes.func.isRequired,
  onRequestSearchFail: PropTypes.func.isRequired,
  query: PropTypes.shape({
    search: PropTypes.string,
    dates: PropTypes.shape({
      start: PropTypes.instanceOf(moment),
      end: PropTypes.instanceOf(moment),
    }),
    filters: PropTypes.shape({}),
    offset: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    sort: PropTypes.shape({
      field: PropTypes.arrayOf(PropTypes.string),
      order: PropTypes.string,
    }),
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(TransactionsSearch)
