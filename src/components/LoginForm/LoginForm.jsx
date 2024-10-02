import React from 'react'
import './loginForm.css'
import { FaLock, FaUser } from 'react-icons/fa'

function LoginForm() {
    return (
        <div className='wrapper'>
            <div>
                <h1>Welcome Back, Admin!</h1>
            </div>
            <form action=''>
                <div className='input-box'>
                    <input type='text' placeholder='Gmail' required />
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Password' required />
                    <FaLock className='icon' />
                </div>

                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm