const MyForm = () => {
  const [values, setValues] = React.useState({
    nombre: '',
    email: '',
    genero: '',
  })

  const [validations, setValidations] = React.useState({
    nombre: '',
    email: '',
    genero: '',
  })

  const validateAll = () => {
    const { nombre, email, genero } = values
    const validations = { nombre: '', email: '', genero: '' }
    let isValid = true

    if (!nombre) {
      validations.name = 'El nombre es requerido'
      isValid = false
    }

    if ((nombre && nombre.length < 3) || nombre.length > 50) {
      validations.nombre = 'El nombre debe contener entre 3 y 50 caracteres'
      isValid = false
    }

    if (!email) {
      validations.email = 'El Email es requerido'
      isValid = false
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      validations.email = 'El formato del Email debe estar como el siguiente ejemplo: example@mail.com'
      isValid = false
    }

    if (!genero) {
      validations.genero = 'El genero es requerido'
      isValid = false
    }

    if (!isValid) {
      setValidations(validations)
    }

    return isValid
  }

  const validateOne = (e) => {
    const { nombre } = e.target
    const value = values[nombre]
    let message = ''

    if (!value) {
      message = `${nombre} es requerido`
    }

    if (value && nombre === 'nombre' && (value.length < 3 || value.length > 50)) {
      message = 'El nombre debe contener entre 3 y 50 caracteres'
    }

    if (value && nombre === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      message = 'El formato del Email debe estar como el siguiente ejemplo: example@mail.com'
    }

    setValidations({ ...validations, [nombre]: message })
  }

  const handleChange = (e) => {
    const { nombre, value } = e.target
    setValues({ ...values, [nombre]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const isValid = validateAll()

    if (!isValid) {
      return false
    }

    alert(JSON.stringify(values))
  }

  const { nombre, email, genero } = values

  const { name: nombreVal, email: emailVal, genero: generoVal } = validations

  return (
    <div>
      <h1>Simple form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="nombre"
              value={nombre}
              onChange={handleChange}
              onBlur={validateOne}
            />
          </label>
          <div>{nombreVal}</div>
        </div>

        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={validateOne}
            />
          </label>
          <div>{emailVal}</div>
        </div>

        <div>
          <label>
            Mujer
            <input
              tipo="radio"
              nombre="genero"
              value="F"
              onChange={handleChange}
              onBlur={validateOne}
            />
          </label>
          <label>
            Masculino
            <input
              tipo="radio"
              nombre="genero"
              value="M"
              onChange={handleChange}
              onBlur={validateOne}
            />
          </label>
          <div>{generoVal}</div>
        </div>

        <button tipo="submit">Enviar</button>
      </form>

      <div>
        <h2>Values of the form</h2>
        <p>{JSON.stringify(values)}</p>
      </div>
    </div>
  )
}
