'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/ui/Button';
import './Home.css';

const Home = () => {
    const router = useRouter();

    return (
        <div className="home-container">
            <div className="home-card">

                <div className="home-logo">
                    <div className="logo-box">3P</div>
                    <h1>3Pixels</h1>
                    <p>Sistema de autenticação seguro e moderno</p>
                </div>

                <div className="home-divider"></div>

                <div className="home-buttons">
                    <Button variant="primary" onClick={() => router.push('/login')}>
                        Fazer Login
                    </Button>
                    <Button variant="secondary" onClick={() => router.push('/signup')}>
                        Cadastrar-se
                    </Button>
                </div>

                <p className="home-footer">© 2025 3Pixels. Todos os direitos reservados.</p>
            </div>
        </div>
    );
};

export default Home;