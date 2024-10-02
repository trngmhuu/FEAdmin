import React, { useState } from 'react'
import './loginForm.css'
import { FaLock, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Gọi API login bằng fetch
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,  // Hoặc tùy theo tên trường trong AuthenticationRequest
                    password: password,  // Tên trường trong AuthenticationRequest
                }),
            });

            const data = await response.json();
            const token = data.result.token; // Lấy token từ phản hồi API

            // Tách phần payload từ token
            const base64Url = token.split('.')[1]; // Phần thứ hai của token là payload
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Thay thế các ký tự Base64 URL-safe
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            // Chuyển đổi chuỗi JSON thành object
            const decodedPayload = JSON.parse(jsonPayload);

            if (response.ok && decodedPayload.scope === 'ADMIN') {
                // Đăng nhập thành công, điều hướng về trang chủ
                localStorage.setItem('token', token);
                navigate('/home');
            } else {
                alert('Đăng nhập thất bại! Bạn không phải là Admin.');
            }
        } catch (error) {
            console.error('Đăng nhập thất bại:', error);
            alert('Đăng nhập thất bại! Vui lòng thử lại sau.');
        }
    };

    return (
        <div className='wrapper'>
            <div>
                <h1>Welcome Back, Admin!</h1>
            </div>
            <form onSubmit={handleLogin}>
                <div className='input-box'>
                    <input
                        type='text'
                        placeholder='Gmail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FaLock className='icon' />
                </div>

                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm