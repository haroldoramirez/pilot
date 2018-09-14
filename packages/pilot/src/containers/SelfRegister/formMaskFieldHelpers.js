function handleMaskField (fieldName) {
  return (event) => {
    const newState = this.state.formData
    newState[fieldName] = event.target.value

    this.setState({
      formData: newState,
    })
  }
}

function onFormMaskFieldChange (data) {
  this.setState({
    formData: {
      ...data,
    },
  })
}

export { handleMaskField, onFormMaskFieldChange }
