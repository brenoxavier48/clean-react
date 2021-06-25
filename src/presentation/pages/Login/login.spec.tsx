import React from 'react'
import faker from 'faker'
import "@testing-library/jest-dom"
import { render, RenderResult, screen, fireEvent } from '@testing-library/react'
import { ValidationSpy, AuthenticationSpy } from '@/presentation/test/'
import { Authentication } from '@/domain/usecases/authentication'
import Login from './Login'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (validationHasError?: boolean): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = faker.random.words()
  validationSpy.hasError = validationHasError

  return {
    sut: render(<Login validation={validationSpy} authentication={authenticationSpy}/>),
    validationSpy,
    authenticationSpy
  }
}

const populateEmailField = (email = faker.internet.email()) => {
  const emailInput = screen.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (password = faker.internet.password()) => {
  const passwordInput = screen.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateValidSubmit = (email = faker.internet.email(), password = faker.internet.password()) => {
  populateEmailField(email)
  populatePasswordField(password)
}

const simulateSubmitClick = () => {
  const submitButton = screen.getByTestId('submit-button')
  fireEvent.click(submitButton)
}

const testFieldStatus = (fieldName: string, titleExpected: string, textContentExpected: string) => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(titleExpected)
  expect(fieldStatus.textContent).toBe(textContentExpected)
}

describe('Login component', () => {
  test('Ensure Login component does\'t show Error and Spinner at the beginning', async () => {
    makeSut()
    const errorWrap = screen.getByTestId('error-wraper')
    expect(errorWrap.childElementCount).toBe(0)
  })

  test('Ensure Login component inputs does\'t show message error at the beginning', async () => {
    makeSut()
    testFieldStatus('email', '', '')
    testFieldStatus('password', '', '')
  })

  test('Ensure submit button is disabled at the begging', async () => {
    makeSut()
    const submitButton = screen.getByTestId('submit-button')
    expect(submitButton).toBeDisabled()
  })

  test('Should call validation with correct email value', async () => {
    const email = faker.internet.email()
    const { validationSpy } = makeSut()
    populateEmailField(email)
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  test('Should call validation with correct password value', async () => {
    const password = faker.internet.password()
    const { validationSpy } = makeSut()
    populatePasswordField(password)
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })

  test('Should shows email error message if validation fails', async () => {
    const { validationSpy } = makeSut(true)
    populateEmailField()
    testFieldStatus('email', validationSpy.errorMessage, '🔴')
  })

  test('Should shows password error message if validation fails', async () => {
    const { validationSpy } = makeSut(true)
    populatePasswordField()
    testFieldStatus('password', validationSpy.errorMessage, '🔴')
  })

  test('Shouldn\'t show any message if email validation doesn\'t fail', async () => {
    makeSut(false)
    populateEmailField()
    testFieldStatus('email', '', '')
  })

  test('Shouldn\'t show any message if password validation doesn\'t fail', async () => {
    makeSut(false)
    populatePasswordField()
    testFieldStatus('password', '', '')
  })

  test('Should enable submit button if validation pass', async () => {
    makeSut(false)
    simulateValidSubmit()
    const submitButton = screen.getByTestId('submit-button')
    expect(submitButton).toBeEnabled()
  })

  test('Should show loading on submit', async () => {
    makeSut(false)
    simulateValidSubmit()
    simulateSubmitClick()
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut(true)
    const password = faker.internet.password()
    const email = faker.internet.email()
    simulateValidSubmit(email, password)
    simulateSubmitClick()
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call Authentication only one time', async () => {
    const { authenticationSpy } = makeSut(true)
    simulateValidSubmit()
    simulateSubmitClick()
    simulateSubmitClick()
    expect(authenticationSpy.counterCall).toBe(1)
  })

})