import React from 'react'
import Styles from './spinner.scss'

type Props = React.HTMLAttributes<HTMLElement>

const Spinner: React.FC<Props> = (props: Props) => (
  <div {...props} className={`${Styles.spinner} ${props.className}`}>
    <div />
    <div />
    <div />
    <div />
  </div>
)

export default Spinner