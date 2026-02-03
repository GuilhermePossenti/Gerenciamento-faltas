'use client';

import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import '../Auth.css';

const LoginPage = () => {
    return (
        <div className="auth-container">
            <div className="auth-card">

                <div className="auth-logo">
                    <div className="auth-logo-box">3P</div>
                    <h2>Bem-vindo de volta</h2>
                    <p>Faça login na sua conta</p>
                </div>

                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;