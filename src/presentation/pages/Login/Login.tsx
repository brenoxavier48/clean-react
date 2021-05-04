import React, { useState, useEffect } from 'react'
import Styles from './login-styles.scss'
import { Validation } from '@/presentation/protocols/validation'
import { 
  LoginHeader, 
  Input, 
  FormStatus, 
  Footer 
} from '@/presentation/components'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {

  const [ displayError, setDisplayError] = useState(false)
  const [ displaySpinner, setDisplaySpinner] = useState(false)

  const [ emailInput, setEmailInput] = useState('')
  const [ passwordInput, setPasswordInput] = useState('')

  const handleChangeInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput((currentValue: string) => event.target.value)
  } 

  const validationObjectFactory = () => ({
    email: emailInput
  })

  useEffect(() => {
    validation.validate(validationObjectFactory())
  }, [emailInput])

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input 
          type="email" 
          name="email" 
          placeholder="Digite seu e-mail" 
          value={emailInput}
          onChange={handleChangeInputEmail}
        />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button 
          data-testid="submit-button"
          type="submit"
          disabled
          className={Styles.submit}
        >
          Entrar
        </button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus 
          displayError={displayError}
          displaySpinner={displaySpinner}
        />
      </form>
      <Footer />
    </div>
  )
}

export default Login
