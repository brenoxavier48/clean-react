export type ValidationResult = {
  hasError: boolean,
  errorMessage: string
}

export interface Validation {
  validate (fieldName: string, fieldValue: string): ValidationResult
}