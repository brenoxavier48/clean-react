import React, { useState, useEffect } from 'react'
import Styles from './login-styles.scss'
import { Validation, ValidationResult } from '@/presentation/protocols/validation'
import { 
  LoginHeader, 
  InputWithValidation, 
  FormStatus, 
  Footer 
} from '@/presentation/components'
import { Authentication } from '@/domain/usecases/authentication'

type Props = {
  validation: Validation,
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {

  const makeValidationResult = (hasError: boolean = false, errorMessage = ''): ValidationResult => ({
    hasError,
    errorMessage
  })

  const [ hasMainError, setHasMainError] = useState(false)
  const [ mainError, setMainError] = useState('')
  
  const [ isLoading, setIsLoading] = useState(false)
  const [ disabledSubmitButton, setDisabledSubmitButton] = useState(true)

  const [ emailInput, setEmailInput] = useState('')
  const [ passwordInput, setPasswordInput] = useState('')

  const [ emailValidation, setEmailValidation] = useState<ValidationResult>(makeValidationResult())
  const [ passwordValidation, setPasswordValidation] = useState<ValidationResult>(makeValidationResult())

  
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value)
  } 

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(event.target.value)
  } 

  const handleSubmitClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if (isLoading || emailValidation.hasError || passwordValidation.hasError) {
      return
    }
    
    setIsLoading(true)

    try {
      const { accessToken } = await authentication.auth({
        email: emailInput,
        password: passwordInput
      })
      localStorage.setItem('accessToken', accessToken)
    } catch(error) {
      setHasMainError(true)
      setMainError(error.message)
      setIsLoading(false)
    }
  } 
 
  const cleanValidationEffectFactory = (
    setStateValidation: React.Dispatch<React.SetStateAction<ValidationResult>>, 
    validationResult: ValidationResult
  ) => () => {
    setStateValidation(validationResult)
    setDisabledSubmitButton(passwordValidation.hasError && emailValidation.hasError)
  }
  
  useEffect(() => {
    const { hasError, errorMessage } = validation.validate('email', emailInput)
    
    return cleanValidationEffectFactory(setEmailValidation, makeValidationResult(hasError, errorMessage))
  }, [emailInput])

  useEffect(() => {
    const { hasError, errorMessage } = validation.validate('password', passwordInput)

    return cleanValidationEffectFactory(setPasswordValidation, makeValidationResult(hasError, errorMessage))
  }, [passwordInput])

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form} onSubmit={handleSubmitClick} data-testid='login-form'>
        <h2>Login</h2>
        <InputWithValidation 
          type="email" 
          name="email" 
          placeholder="Digite seu e-mail" 
          value={emailInput}
          onChange={handleChangeEmail}
          hasError={emailValidation.hasError}
          errorMessage={emailValidation.errorMessage}
        />
        <InputWithValidation 
          type="password" 
          name="password" 
          placeholder="Digite sua senha" 
          value={passwordInput}
          onChange={handleChangePassword}
          hasError={passwordValidation.hasError}
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
            shouldDisplay: hasMainError,
            message: mainError
          }}
          displaySpinner={isLoading}
        />
      </form>
      <Footer />
    </div>
  )
}

export default Login
