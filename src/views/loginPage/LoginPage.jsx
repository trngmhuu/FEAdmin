import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './loginPage.module.css'

function LoginPage() {
    return (
        <div className={styles.loginContainer}>
            <LoginForm />
        </div>

    )
}

export default LoginPage