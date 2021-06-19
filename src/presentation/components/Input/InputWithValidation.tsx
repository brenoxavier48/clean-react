import React from 'react'
import Styles from './input.scss'

import { ValidationResult } from '@/presentation/protocols/validation'

type Props = ValidationResult & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const InputWithValidation: React.FC<Props> = ({ 
  hasError, 
  errorMessage,
  ...props 
}: Props) => {

  const getStatus = (): string => hasError ? '🔴' : ''

  const getTitle = (): string => hasError ? errorMessage : ''
  
  return (
    <div className={Styles.inputWrap}>
      <input 
        {...props} 
        data-testid={props.name}
      />
      <span 
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={Styles.status}
      >
        {getStatus()}
      </span>
    </div>
  )    
}

export default InputWithValidation