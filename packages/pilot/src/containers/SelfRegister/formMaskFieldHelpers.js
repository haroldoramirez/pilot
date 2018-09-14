function handleMaskField (fieldName) {
  const newState = {}

  return (event) => {
    newState[fieldName] = event.target.value

    this.setState(newState)
  }
}

function onFormMaskFieldChange (data) {
  this.setState({
    ...data,
  })
}

export { handleMaskField, onFormMaskFieldChange }
