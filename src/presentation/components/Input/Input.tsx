import React from 'react'
import Styles from './input.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => (
  <div className={Styles.inputWrap}>
    <input 
      {...props} 
      data-testid={props.name}
    />
    <span className={Styles.status}>🔴</span>
  </div>
)

export default Input