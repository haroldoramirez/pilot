import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Card,
  CardContent,
  Col,
  Grid,
  Row,
} from 'former-kit'
import ArrowBack from 'emblematic-icons/svg/ChevronBack24.svg'
import classNames from 'classnames'

import Logo from '../../pages/logo.svg'
import SelfRegisterBulletSteps from '../../components/SelfRegister/BulletSteps'
import SelfRegisterContainer from './SelfRegisterContainer'
import style from './style.css'

const SelfRegisterForm = ({
  registerData,
  onPreviousButton,
  onRedirectToHome,
  onSubmit,
  step,
  t,
}) => (
  <div className={style.fullScreen}>
    <Grid className={style.blankCard}>
      <Row className={style.contentRowForm}>
        <Col tv={12} desk={12} tablet={12} palm={12} className={style.columnPadding}>
          <Card className={style.stretchVertically}>
            <CardContent className={style.stretchVertically}>
              <Grid fullHeight>
                <Row className={style.stretchVertically}>
                  <Col tv={3} desk={3} tablet={3} palm={3}>
                    <div className={style.header}>
                      <Button
                        fill="outline"
                        icon={<ArrowBack height={12} width={12} />}
                        onClick={onPreviousButton}
                        size="tiny"
                        type="submit"
                      >
                        {t('pages.self_register.return')}
                      </Button>
                    </div>
                  </Col>
                  <Col
                    align="center"
                    className={classNames(style.stretchVertically, style.noPaddingBottom)}
                    desk={6}
                    palm={6}
                    tablet={6}
                    tv={6}
                  >
                    <Logo className={style.logo} width={140} />
                    <div className={classNames(style.growContent, style.centerContent)}>
                      <SelfRegisterContainer
                        registerData={registerData}
                        onRedirectToHome={onRedirectToHome}
                        onSubmit={onSubmit}
                        step={step}
                        t={t}
                      />
                    </div>
                  </Col>
                  <Col tv={3} desk={3} tablet={3} palm={3} />
                </Row>
              </Grid>
            </CardContent>
          </Card>
        </Col>
      </Row>
      <Row className={style.rowBullet}>
        <Col tv={12} desk={12} tablet={12} palm={12} className={style.stepsMiddle}>
          <SelfRegisterBulletSteps
            step={step}
          />
        </Col>
      </Row>
    </Grid>
  </div>
)

SelfRegisterForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  registerData: PropTypes.object,
  onPreviousButton: PropTypes.func.isRequired,
  onRedirectToHome: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  step: PropTypes.oneOf([
    'create-account',
    'check-cnpj',
    'type-cnpj',
    'without-cnpj',
    'company-data',
    'partner-data',
    'partner-address',
    'already-sell',
    'business-detail-present',
    'business-detail-future',
    'sales-amount-present',
    'sales-amount-future',
    'contract',
  ]),
  t: PropTypes.func.isRequired,
}

SelfRegisterForm.defaultProps = {
  registerData: {},
  step: 'create-account',
}

export default SelfRegisterForm
