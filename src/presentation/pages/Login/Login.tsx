import React from 'react'
import Styles from './login-styles.scss'
import LoginHeader from '@/presentation/components/LoginHeader/LoginHeader'
import Footer from '@/presentation/components/Footer/Footer'
import Input from '@/presentation/components/Input/Input'
import FormStatus from '@/presentation/components/FormStatus/FormStatus'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button 
          type="submit"
          className={Styles.submit}
        >
          Entrar
        </button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus 
          displayError={true}
          displaySpinner={true}
        />
      </form>
      <Footer />
    </div>
  )
}

export default Login
