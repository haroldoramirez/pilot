import { applySpec } from 'ramda'
import balance from './balance'
import bulkAnticipations from './bulkAnticipations'
import business from './business'
import proxy from './proxy'
import user from './user'
import company from './company'
import invites from './invites'
import recipient from './recipient'
import transactions from './transactions'
import register from './company/register'

const createCompany = register

export { createCompany }

const cockpit = applySpec({
  balance,
  bulkAnticipations,
  business,
  transactions,
  user,
  company,
  invites,
  recipient,
})

export default proxy(cockpit)
