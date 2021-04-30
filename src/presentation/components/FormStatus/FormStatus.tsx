import React from 'react'
import Styles from './formStatus.scss'
import Spinner from '@/presentation/components/Spinner/Spinner'

type Displays = {
  displayError: boolean
  displaySpinner: boolean
}

type Props = Displays

const FormStatus: React.FC<Props> = (props: Props) => (
  <div data-testid="error-wraper" className={Styles.errorWrap}>
    { 
      props.displaySpinner 
      && <Spinner className={Styles.spinner}/>
    }
    { 
      props.displayError 
      && <span className={Styles.error}> Erro </span>
    }
  </div>
)

export default FormStatus
