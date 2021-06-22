import React, { useState, useEffect } from 'react'
import Styles from './login-styles.scss'
import { Validation, ValidationResult } from '@/presentation/protocols/validation'
import { 
  LoginHeader, 
  InputWithValidation, 
  FormStatus, 
  Footer 
} from '@/presentation/components'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {

  const makeValidationResult = (hasError: boolean = undefined, errorMessage = ''): ValidationResult => ({
    hasError,
    errorMessage
  })

  const [ displayError, setDisplayError] = useState(false)
  const [ displaySpinner, setDisplaySpinner] = useState(false)
  const [ disabledSubmitButton, setDisabledSubmitButton] = useState(true)

  const [ emailInput, setEmailInput] = useState('')
  const [ passwordInput, setPasswordInput] = useState('')

  const [ emailValidation, setEmailValidation] = useState<ValidationResult>(makeValidationResult())
  const [ passwordValidation, setPasswordValidation] = useState<ValidationResult>(makeValidationResult())

  
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput((currentValue: string) => event.target.value)
  } 

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput((currentValue: string) => event.target.value)
  } 

  const cleanValidation = (setStateValidation: React.Dispatch<React.SetStateAction<ValidationResult>>, validationResult: ValidationResult) => {
    return () => {
      setStateValidation(validationResult)
      setDisabledSubmitButton(passwordValidation.hasError && emailValidation.hasError)
    }
  }

  useEffect(() => {
    const { hasError, errorMessage } = validation.validate('email', emailInput)
    
    return cleanValidation(setEmailValidation, makeValidationResult(hasError, errorMessage))
  }, [emailInput])

  useEffect(() => {
    const { hasError, errorMessage } = validation.validate('password', passwordInput)
    
    return cleanValidation(setPasswordValidation, makeValidationResult(hasError, errorMessage))
  }, [passwordInput])

  // useEffect(() => {
  //   return () => setDisabledSubmitButton(passwordValidation.hasError && emailValidation.hasError)
  // }, [passwordInput, emailInput])

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <InputWithValidation 
          type="email" 
          name="email" 
          placeholder="Digite seu e-mail" 
          value={emailInput}
          onChange={handleChangeEmail}
          hasError={emailValidation.hasError || false}
          errorMessage={emailValidation.errorMessage}
        />
        <InputWithValidation 
          type="password" 
          name="password" 
          placeholder="Digite sua senha" 
          value={passwordInput}
          onChange={handleChangePassword}
          hasError={passwordValidation.hasError || false}
          errorMessage={passwordValidation.errorMessage}
        />
        <button 
          data-testid="submit-button"
          type="submit"
          disabled={disabledSubmitButton}
          className={Styles.submit}
        >
          Entrar
        </button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus 
          errorState={{
            shouldDisplay: displayError,
            message: ''
          }}
          displaySpinner={displaySpinner}
        />
      </form>
      <Footer />
    </div>
  )
}

export default Login
