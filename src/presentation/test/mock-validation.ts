import { Validation, ValidationResult } from '@/presentation/protocols/Validation'
import faker from 'faker'

export class ValidationSpy implements Validation {
  errorMessage: string 
  hasError: boolean 
  fieldName: string
  fieldValue: string

  validate(fieldName: string, fieldValue: string): ValidationResult {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    
    return {
      hasError: this.hasError,
      errorMessage: this.errorMessage
    }
  }
}
