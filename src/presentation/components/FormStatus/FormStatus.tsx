import React from 'react'
import Styles from './formStatus.scss'
import Spinner from '@/presentation/components/Spinner/Spinner'

type Displays = {
  displayError: boolean
  displaySpinner: boolean
}

type Props = Displays

const FormStatus: React.FC<Props> = (props: Props) => (
  <div className={Styles.errorWrap}>
    <Spinner className={`${Styles.spinner} ${props.displaySpinner ? Styles.visible : ''}`}/>
    <span className={`${Styles.error} ${props.displayError ? Styles.visible : ''}`}>
      Erro
    </span>
  </div>
)

export default FormStatus