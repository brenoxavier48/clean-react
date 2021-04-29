import React, { memo } from 'react'
import Styles from './loginHeader.scss'
import Logo from '@/presentation/components/Logo/Logo'

const LoginHeader: React.FC = () => (
  <header className={Styles.header}>
    <Logo />
    <h1>4Dev - Enquetes para Programadores</h1>
  </header>
)

export default memo(LoginHeader)
