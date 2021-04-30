import React, { useState } from 'react'
import Styles from './login-styles.scss'
import { 
  LoginHeader, 
  Input, 
  FormStatus, 
  Footer 
} from '@/presentation/components'

const Login: React.FC = () => {

  const [ displayError, setDisplayError] = useState(false)
  const [ displaySpinner, setDisplaySpinner] = useState(false)

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
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
