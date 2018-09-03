import React from 'react'
// import { identity } from 'ramda'
import { storiesOf } from '@storybook/react'
import { Layout } from 'former-kit'
import { action } from '@storybook/addon-actions'

import SelfRegister from '../../../src/pages/SelfRegister'
import translations from '../../../public/locales/pt/translations.json'

const actionCompanyCreated = action('Company Created')
const actionRedirectToHome = action('Redirect to Home')

const translate = (path) => {
  const keys = path.split('.')
  let part = translations
  keys.forEach((element) => {
    part = part[element]
  })

  return part
}

storiesOf('Pages', module)
  .add('Self Register', () => (
    <Layout>
      <SelfRegister
        onCompanyCreated={actionCompanyCreated}
        onRedirectToHome={actionRedirectToHome}
        step="create-account"
        t={translate}
      />
    </Layout>
  ))

