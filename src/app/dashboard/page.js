'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Button from '../../componentes/ui/Button';
import Loading from '../../componentes/ui/Loading';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    if (loading) return <Loading />;
    if (!user) return null;

    return (
        <div className="dashboard-container">

            {/* navbar */}
            <nav className="dashboard-nav">
                <div className="nav-content">
                    <div className="nav-logo">
                        <div className="nav-logo-box">3P</div>
                        <span>Dashboard</span>
                    </div>
                    <Button variant="danger" onClick={handleLogout}>
                        Sair
                    </Button>
                </div>
            </nav>

            {/* conteúdo */}
            <div className="dashboard-content">

                <div className="dashboard-card">
                    <h1>Bem-vindo! 👋</h1>
                    <p>Você está logado com sucesso no sistema.</p>
                </div>

                <div className="dashboard-card">
                    <h2>Seus Dados</h2>

                    <div className="dado-item">
                        <span className="dado-label">Nome</span>
                        <span className="dado-valor">{user.nome || 'Não informado'}</span>
                    </div>

                    <div className="dado-item">
                        <span className="dado-label">Email</span>
                        <span className="dado-valor">{user.email || 'Não informado'}</span>
                    </div>

                    <div className="dado-item">
                        <span className="dado-label">CPF (Usuário)</span>
                        <span className="dado-valor">{user.username || 'Não informado'}</span>
                    </div>

                    <div className="dado-item">
                        <span className="dado-label">Telefone</span>
                        <span className="dado-valor">{user.telefone || 'Não informado'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;