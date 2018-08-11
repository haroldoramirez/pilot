import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import IconChart from 'emblematic-icons/svg/TrendingUp32.svg'
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import IconTable from 'emblematic-icons/svg/Menu32.svg'
import IconWarning from 'emblematic-icons/svg/Warning32.svg'
import Search32 from 'emblematic-icons/svg/Search32.svg'
import Calendar32 from 'emblematic-icons/svg/Calendar32.svg'
import Download32 from 'emblematic-icons/svg/Download32.svg'

import {
  findIndex,
  propEq,
} from 'ramda'

import {
  Alert,
  Card,
  CardActions,
  CardContent,
  CardTitle,
  Col,
  DateInput,
  Dropdown,
  Grid,
  Input,
  Pagination,
  Row,
  SegmentedSwitch,
  Table,
} from 'former-kit'

import style from './style.css'

import Filter from '../Filter'
import Charts from './Charts'
import ExportData from '../../components/ExportData'
import tableColumns from './tableColumns'

import itemsPerPage from '../../models/itemsPerPage'
import formatCurrency from '../../formatters/currency'
import formatDate from '../../formatters/longDate'
import translateDateInput from '../../formatters/dateInputTranslator'

const formatSelectedPeriod = (t, { start, end }) => {
  if (!start && !end) {
    return t('pages.transactions.period_full')
  }

  if (moment(start).isSame(end, 'days')) {
    return t('pages.transactions.period_today')
  }

  return t(
    'pages.transactions.period',
    {
      start: formatDate(start),
      end: formatDate(end),
    }
  )
}

const mimeCSV = (query) => {
 //csv dash
}

const mimeExcel = (query) => {
 //excel dash
}

const exportOptions = [
  { title: 'CSV', action: () => mimeCSV(query) },
  { title: 'Excel', action: () => mimeExcel(query) },
]

const TransactionsList = ({
  amount,
  count,
  data,
  dateSelectorPresets,
  expandedRows,
  filterOptions,
  loading,
  onChangeViewMode,
  onDetailsClick,
  onPendingReviewsFilter,
  onExpandRow,
  onFilterChange,
  onFilterClear,
  onOrderChange,
  onPageChange,
  onPageCountChange,
  onRowClick,
  onSelectRow,
  order,
  orderField,
  pagination,
  pendingReviewsCount,
  query,
  rows,
  selectedPage,
  selectedRows,
  t,
  viewMode,
}) => {
  const columns = tableColumns({ t, onDetailsClick })
  const orderColumn = findIndex(propEq('accessor', orderField), columns)
  const handleOrderChange = (columnIndex, tableOrder) =>
    onOrderChange(columns[columnIndex].accessor, tableOrder)

  return (
    <Grid>
      {pendingReviewsCount > 0 &&
        <Row>
          <Col
            desk={12}
            palm={12}
            tablet={12}
            tv={12}
          >
            <Alert
              action={t('pages.transaction.view_transactions')}
              icon={<IconWarning height={16} width={16} />}
              onDismiss={onPendingReviewsFilter}
              type="warning"
            >
              <p>
                <strong>{t('pages.transaction.alert.warning')}</strong>&nbsp;
                {
                  t('pages.transaction.alert.pending_review', { count: pendingReviewsCount })
                }
              </p>
            </Alert>
          </Col>
        </Row>
      }
      <Row>
        <Col
          palm={12}
          tablet={12}
          desk={12}
          tv={12}
        >
          <Filter
            disabled={loading}
            onChange={onFilterChange}
            onClear={onFilterClear}
            options={filterOptions}
            query={query}
            t={t}
          >
            <DateInput
              icon={<Calendar32 width={16} height={16} />}
              name="dates"
              presets={dateSelectorPresets}
              strings={translateDateInput(t)}
            />
            <Input
              icon={<Search32 width={16} height={16} />}
              name="search"
              placeholder={t('pages.transactions.text_search_placeholder')}
            />
          </Filter>
        </Col>
        <Col
          palm={12}
          tablet={12}
          desk={12}
          tv={12}
        >
          {rows.length <= 0 && !loading &&
            <Alert
              icon={<IconInfo height={16} width={16} />}
              type="info"
            >
              <p>
                <strong>{t('pages.transactions.no_results')}</strong>&nbsp;
                {t('pages.transactions.try_again')}
              </p>
            </Alert>
          }
          {rows.length > 0 &&
            <Card>
              <CardTitle
                title={
                  <h2 className={style.customTitle}>
                    {formatSelectedPeriod(t, query.dates)}
                    <div className={style.verticalDivider} />
                    {count}&nbsp;
                    <small>{t('pages.transactions.count')}</small>&nbsp;
                    <small>-</small>&nbsp;
                    <small>{t('pages.transactions.total_amount')}</small>&nbsp;
                    {formatCurrency(amount)}
                  </h2>
                }
                subtitle={
                  <div className={style.toolBar}>
                    <ExportData
                      exportOptions={exportOptions}
                      icon={<Download32 width={12} height={12} />}
                      placement="bottomEnd"
                      relevance="tiny"
                      size="low"
                      subTitle="Exportar para:"
                      title="exportar tabela"
                    />
                    <SegmentedSwitch
                      disabled={loading}
                      name="view-mode"
                      onChange={onChangeViewMode}
                      options={[
                        {
                          title: <IconTable width={16} height={16} />,
                          value: 'table',
                        },
                        {
                          title: <IconChart width={16} height={16} />,
                          value: 'chart',
                        },
                      ]}
                      value={viewMode}
                    />
                    <Dropdown
                      disabled={loading || viewMode === 'graph'}
                      name="page-count"
                      onChange={e =>
                        onPageCountChange(parseInt(e.target.value, 10))
                      }
                      options={itemsPerPage.map(i => ({
                        name: t('pages.transactions.items_per_page', { count: i }),
                        value: `${i}`,
                      }))}
                      size="tiny"
                      value={selectedPage.toString()}
                    />
                    <Pagination
                      currentPage={pagination.offset}
                      disabled={loading || viewMode === 'graph'}
                      onPageChange={onPageChange}
                      size="tiny"
                      strings={{
                        of: t('components.pagination.of'),
                      }}
                      totalPages={pagination.total}
                    />
                  </div>
                }
              />

              <CardContent>
                {viewMode === 'chart' &&
                  <Charts
                    data={data}
                    legendsTitle={t('pages.transactions.graphic_legends')}
                  />
                }
                {viewMode === 'table' &&
                  <Table
                    columns={columns}
                    disabled={loading}
                    expandable
                    expandedRows={expandedRows}
                    maxColumns={7}
                    onExpandRow={onExpandRow}
                    onOrderChange={handleOrderChange}
                    onRowClick={onRowClick}
                    onSelectRow={onSelectRow}
                    orderColumn={orderColumn}
                    orderSequence={order}
                    rows={rows}
                    selectedRows={selectedRows}
                  />
                }
              </CardContent>

              {viewMode === 'table' &&
                <CardActions>
                  <Pagination
                    currentPage={pagination.offset}
                    disabled={loading}
                    onPageChange={onPageChange}
                    strings={{
                      of: t('components.pagination.of'),
                    }}
                    size="tiny"
                    totalPages={pagination.total}
                  />
                </CardActions>
              }
            </Card>
          }
        </Col>
      </Row>
    </Grid>
  )
}

TransactionsList.propTypes = {
  amount: PropTypes.number,
  count: PropTypes.number,
  // eslint-disable-next-line
  data: PropTypes.arrayOf(PropTypes.object),
  query: PropTypes.shape({
    dates: PropTypes.shape({
      start: PropTypes.instanceOf(moment),
      end: PropTypes.instanceOf(moment),
    }),
    search: PropTypes.string,
    // eslint-disable-next-line
    properties: PropTypes.object,
  }),
  dateSelectorPresets: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.func,
    })),
  })).isRequired,
  expandedRows: PropTypes.arrayOf(PropTypes.number).isRequired,
  filterOptions: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    name: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  onDetailsClick: PropTypes.func.isRequired,
  onExpandRow: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onFilterClear: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageCountChange: PropTypes.func.isRequired,
  onPendingReviewsFilter: PropTypes.func.isRequired,
  onSelectRow: PropTypes.func.isRequired,
  onChangeViewMode: PropTypes.func.isRequired,
  order: PropTypes.string,
  orderField: PropTypes.arrayOf(PropTypes.string),
  pagination: PropTypes.shape({
    offset: PropTypes.number,
    total: PropTypes.number,
  }).isRequired,
  pendingReviewsCount: PropTypes.number.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedPage: PropTypes.number,
  selectedRows: PropTypes.arrayOf(PropTypes.number).isRequired,
  t: PropTypes.func.isRequired,
  viewMode: PropTypes.oneOf(['chart', 'table']).isRequired,
}

TransactionsList.defaultProps = {
  amount: 0,
  count: 0,
  order: 'descending',
  orderField: [],
  query: {
    dates: {
      start: moment(),
      end: moment(),
    },
    search: '',
    properties: {},
  },
  selectedPage: 15,
}

export default TransactionsList
