import React from 'react'
import faker from 'faker'
import "@testing-library/jest-dom"
import { render, RenderResult, screen, fireEvent } from '@testing-library/react'
import { ValidationSpy } from '@/presentation/test/'
import Login from './Login'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  
  return {
    sut: render(<Login validation={validationSpy}/>),
    validationSpy
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
    const { validationSpy } = makeSut()
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

})