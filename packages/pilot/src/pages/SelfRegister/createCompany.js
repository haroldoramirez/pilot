import cockpitSelfRegister from 'cockpit/src/company/selfRegister'

const createCompany = async () => {
  const result = await cockpitSelfRegister.create()
  return result
}

export default createCompany
