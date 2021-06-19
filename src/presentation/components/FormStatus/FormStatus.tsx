import React from 'react'
import Styles from './formStatus.scss'
import Spinner from '@/presentation/components/Spinner/Spinner'

type error = {
  shouldDisplay: boolean,
  message: string
}

type Displays = {
  errorState: error
  displaySpinner: boolean
}

type Props = Displays

const FormStatus: React.FC<Props> = ({ errorState, displaySpinner }: Props) => (
  <div data-testid="error-wraper" className={Styles.errorWrap}>
    { 
      displaySpinner 
      && <Spinner className={Styles.spinner}/>
    }
    { 
      errorState.shouldDisplay 
      && <span className={Styles.error}> { errorState.message } </span>
    }
  </div>
)

export default FormStatus
