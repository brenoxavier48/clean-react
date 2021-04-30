import React from 'react'
import { render, screen } from '@testing-library/react'
import Login from './Login'

describe('Login component', () => {
  test('Ensure Login component does\'t show Error and Spinner at the beginning', async () => {
    render(<Login />)
    const errorWrap = screen.getByTestId('error-wraper')
    expect(errorWrap.childElementCount).toBe(0)
  })
})