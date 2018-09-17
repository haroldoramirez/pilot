import { range } from 'ramda'

function formatToRecipientData (data) {
  const recipientData = {}
  const { documentType } = data.identification

  // Bank account
  if (data.bankAccount.id) {
    recipientData.bank_account_id = data.bankAccount.id
  } else {
    const { number } = data.bankAccount
    const document = data.identification[documentType]

    recipientData.bank_account = {
      bank_code: data.bankAccount.bank,
      agencia: data.bankAccount.agency,
      conta: number.slice(0, -1),
      conta_dv: number.slice(-1),
      type: data.bankAccount.type,
      document_number: document,
      legal_name: data.bankAccount.name,
    }
  }

  // Transfer
  // TODO: transfer interval quando !transferEnabled deve ser zero
  recipientData.transfer_interval = data.configuration.transferInterval
  recipientData.transfer_enabled = data.configuration.transferEnabled

  if (data.configuration.transferInterval === 'weekly') {
    switch (data.configuration.transferWeekday) {
      case 'monday':
        recipientData.transfer_day = '1'
        break
      case 'tuesday':
        recipientData.transfer_day = '2'
        break
      case 'wednesday':
        recipientData.transfer_day = '3'
        break
      case 'thursday':
        recipientData.transfer_day = '4'
        break
      case 'friday':
        recipientData.transfer_day = '5'
        break
      default:
        break
    }
  } else {
    recipientData.transfer_day = data.configuration.transferDay
  }

  // Anticipation

  // TODO: "automatic_anticipation_type" só pode existir se
  // "config_anticipation_params" nos dados da company for true
  switch (data.configuration.anticipationModel) {
    case 'automatic_dx':
      recipientData.anticipatable_volume_percentage = 100
      recipientData.automatic_anticipation_enabled = true
      // recipientData.automatic_anticipation_type = '1025'
      recipientData.automatic_anticipation_days = range(1, 32)
      recipientData.automatic_anticipation_1025_delay =
        data.configuration.anticipationDays
      break
    case 'automatic_volume':
      recipientData.anticipatable_volume_percentage =
        data.configuration.anticipationVolumePercentage
      recipientData.automatic_anticipation_enabled = true
      // recipientData.automatic_anticipation_type = 'full'
      break
    case 'automatic_1025':
      recipientData.anticipatable_volume_percentage = 100
      recipientData.automatic_anticipation_enabled = true
      // recipientData.automatic_anticipation_type = '1025'
      recipientData.automatic_anticipation_days = [10, 25]
      recipientData.automatic_anticipation_1025_delay = 15
      break
    case 'manual':
    default:
      recipientData.anticipatable_volume_percentage =
        data.configuration.anticipationVolumePercentage
      recipientData.automatic_anticipation_enabled = false
      // recipientData.automatic_anticipation_type = 'full'
      break
  }

  // Register
  const hasRegisterInformation = data
    .identification[`${documentType}Information`]

  if (hasRegisterInformation) {
    const phone = data.identification[`${documentType}Phone`]
      .replace(/\D/g, '')

    const ddd = phone.slice(0, 2)
    const number = phone.slice(2)
    const url = data.identification[`${documentType}Url`]

    recipientData.register_information = {
      document_number: data.identification[documentType].replace(/\D/g, ''),
      // TODO: validar http(s) no formulário
      site_url: `http://${url}`,
      email: data.identification[`${documentType}Email`],
      phone_numbers: [{
        ddd,
        number,
        // TODO: recuperar tipo de telefone do formulário
        type: 'mobile',
      }],
    }

    const name = data.identification[`${documentType}Name`]

    if (documentType === 'cpf') {
      recipientData.register_information.type = 'individual'
      recipientData.register_information.name = name
    }

    if (documentType === 'cnpj') {
      recipientData.register_information.type = 'corporation'
      recipientData.register_information.company_name = name
    }

    const partnerNumber = parseInt(data.identification.partnerNumber, 10)

    if (partnerNumber > 0) {
      const partners = range(0, partnerNumber)
        .map(n => data.identification[`partner${n}`])
        // TODO: Precisa de email, não usa telefone
        .map(partner => ({
          type: 'individual',
          document_number: partner.cpf.replace(/\D/g, ''),
          name: partner.name,
          email: 'some@email.com',
        }))

      recipientData.register_information.managing_partners = partners
    }
  }

  return recipientData
}

const AddRecipient = client => (data) => {
  const recipientData = formatToRecipientData(data)
  return client.recipients.create(recipientData)
}

export default AddRecipient
