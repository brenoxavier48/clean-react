import React from 'react'
import "@testing-library/jest-dom"
import { render, RenderResult, screen } from '@testing-library/react'
import Login from './Login'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  return {
    sut: render(<Login />)
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
})