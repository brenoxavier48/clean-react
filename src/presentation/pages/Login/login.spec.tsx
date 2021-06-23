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

describe('Login component', () => {
  test('Ensure Login component does\'t show Error and Spinner at the beginning', async () => {
    makeSut()
    const errorWrap = screen.getByTestId('error-wraper')
    expect(errorWrap.childElementCount).toBe(0)
  })

  test('Ensure Login component inputs does\'t show message error at the beginning', async () => {
    makeSut()
    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe('')
    expect(emailStatus.textContent).toBe('')
    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe('')
    expect(passwordStatus.textContent).toBe('')
  })

  test('Ensure submit button is disabled at the begging', async () => {
    makeSut()
    const submitButton = screen.getByTestId('submit-button')
    expect(submitButton).toBeDisabled()
  })

  test('Should call validation with correct email value', async () => {
    const email = faker.internet.email()
    const { validationSpy } = makeSut()
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  test('Should call validation with correct password value', async () => {
    const password = faker.internet.password()
    const { validationSpy } = makeSut()
    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })

  test('Should shows email error message if validation fails', async () => {
    const email = faker.internet.email()
    const { validationSpy } = makeSut(true)
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should shows password error message if validation fails', async () => {
    const password = faker.internet.password()
    const { validationSpy } = makeSut(true)
    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Shouldn\'t show any message if email validation doesn\'t fail', async () => {
    const email = faker.internet.email()
    makeSut(false)
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe('')
    expect(emailStatus.textContent).toBe('')
  })

  test('Shouldn\'t show any message if password validation doesn\'t fail', async () => {
    const password = faker.internet.password()
    makeSut(false)
    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe('')
    expect(passwordStatus.textContent).toBe('')
  })

  test('Should enable submit button if validation pass', async () => {
    makeSut(false)
    const passwordInput = screen.getByTestId('password')
    const emailInput = screen.getByTestId('email')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const submitButton = screen.getByTestId('submit-button')
    expect(submitButton).toBeEnabled()
  })

  test('Should show loading on submit', async () => {
    makeSut(false)
    const passwordInput = screen.getByTestId('password')
    const emailInput = screen.getByTestId('email')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const submitButton = screen.getByTestId('submit-button')
    fireEvent.click(submitButton)
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut(true)
    const password = faker.internet.password()
    const email = faker.internet.email()
    const passwordInput = screen.getByTestId('password')
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
    fireEvent.input(passwordInput, { target: { value: password } })
    const submitButton = screen.getByTestId('submit-button')
    fireEvent.click(submitButton)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

})