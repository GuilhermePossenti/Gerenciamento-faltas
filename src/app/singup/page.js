'use client';

import React from 'react';
import SingupForm from '../../componentes/auth/SingupForm';
import '../Auth.css';

const SignupPage = () => {
    return (
        <div className="auth-container">
            <div className="auth-card">

                <div className="auth-logo">
                    <div className="auth-logo-box">3P</div>
                    <h2>Criar conta</h2>
                    <p>Preencha os dados abaixo para se cadastrar</p>
                </div>

                <SingupForm />
            </div>
        </div>
    );
};

export default SignupPage;