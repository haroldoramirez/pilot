const bankAccount = client => (documentData) => {
  const document = documentData[documentData.documentType]
  const documentNumber = document.replace(/\D/g, '')
  const query = { document_number: documentNumber }

  return client.bankAccounts.all(query)
    .then((foundBankAccounts) => {
      const accounts = foundBankAccounts.map(account => ({
        name: account.legal_name,
        number: account.conta + account.conta_dv,
        type: account.type,
        agency: account.agencia,
        bank: account.bank_code,
        id: account.id.toString(),
      }))

      return { accounts }
    })
}

export default bankAccount
