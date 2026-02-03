'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '../componentes/ui/Button';
import './Home.css';

const Home = () => {
    const router = useRouter();

    return (
        <div className="home-container">
            <div className="home-card">

                <div className="home-logo">
                    <div className="logo-box">
                        <svg width="40" height="40" viewBox="0 0 40 40">
                            <rect x="0" y="0" width="18" height="18" fill="#133580" />
                            <rect x="20" y="0" width="14" height="14" fill="#EF4444" />
                            <rect x="20" y="16" width="14" height="14" fill="#EAB308" />
                        </svg>
                    </div>
                    <h1>3Pixels</h1>
                    <p>Desenvolvimento de sistemas para as mais diversas soluções</p>
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