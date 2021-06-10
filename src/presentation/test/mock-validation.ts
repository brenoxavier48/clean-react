import { Validation } from '@/presentation/protocols/Validation'

export class ValidationSpy implements Validation {
  errorMessage: string
  input: Object

  validate(input: Object): boolean {
    this.input = input
    return true
  }
}