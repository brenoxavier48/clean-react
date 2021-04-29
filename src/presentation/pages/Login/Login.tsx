import React from 'react'
import Styles from './login-styles.scss'
import LoginHeader from '@/presentation/components/LoginHeader/LoginHeader'
import Footer from '@/presentation/components/Footer/Footer'
import Input from '@/presentation/components/Input/Input'
import Spinner from '@/presentation/components/Spinner/Spinner'

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
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner}/>
          <span className={Styles.error}>
            Erro
          </span>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login
