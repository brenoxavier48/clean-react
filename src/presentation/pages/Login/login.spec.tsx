import React from 'react'
import "@testing-library/jest-dom"
import { render, RenderResult, screen, fireEvent } from '@testing-library/react'
import { Validation } from '@/presentation/protocols/validation'
import Login from './Login'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  input: Object

  validate(input: Object): boolean {
    this.input = input
    return true
  }
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

  test('Ensure submit button is disabled at the begging', async () => {
    makeSut()
    const submitButton = screen.getByTestId('submit-button')
    expect(submitButton).toBeDisabled()
  })

  test('Should call validation with correct value', async () => {
    const { validationSpy } = makeSut()
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.input).toEqual({
      email: 'any_email'
    })
  })
})