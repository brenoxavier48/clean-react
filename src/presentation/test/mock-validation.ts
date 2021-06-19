import { Validation, ValidationResult } from '@/presentation/protocols/Validation'

export class ValidationSpy implements Validation {
  errorMessage: string
  fieldName: string
  fieldValue: string

  validate(fieldName: string, fieldValue: string): ValidationResult {
    this.fieldName = fieldName
    this.fieldValue = fieldValue

    return {
      hasError: false,
      errorMessage: this.errorMessage
    }
  }
}
