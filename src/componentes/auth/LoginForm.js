import React, { useState } from 'react';
import { authService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Input from '../ui/Input';
import Button from '../ui/Button';
import './LoginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    // primeira etapa: verificar se CPF existe
    const handlePreSignin = async () => {
        if (!username.trim()) {
            setError('CPF é obrigatório');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await authService.preSignin(username);
            setMostrarSenha(true);
        } catch (err) {
            setError(err.response?.data?.erro || 'CPF não encontrado');
        } finally {
            setLoading(false);
        }
    };

    // segunda etapa: fazer login com senha
    const handleSignin = async () => {
        if (!password.trim()) {
            setError('Senha é obrigatória');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const data = await authService.signin({ username, password });
            login(data.user, {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            });
            router.push('/dashboard');
        } catch (err) {
            setError(err.response?.data?.erro || 'Senha incorreta');
        } finally {
            setLoading(false);
        }
    };

    const voltarParaCPF = () => {
        setMostrarSenha(false);
        setPassword('');
        setError('');
    };

    return (
        <div className="login-form">
            {error && <div className="alert alert-error">{error}</div>}

            {!mostrarSenha ? (
                <>
                    <Input
                        label="CPF (usuário)"
                        name="username"
                        placeholder="12345678901"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setError('');
                        }}
                    />

                    <Button onClick={handlePreSignin} loading={loading} variant="primary">
                        Continuar
                    </Button>
                </>
            ) : (
                <>
                    <div className="cpf-display">
                        <div>
                            <span className="cpf-label">CPF</span>
                            <p className="cpf-value">{username}</p>
                        </div>
                        <button onClick={voltarParaCPF} className="cpf-alterar">
                            Alterar
                        </button>
                    </div>

                    <Input
                        label="Senha"
                        name="password"
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError('');
                        }}
                    />

                    <Button onClick={handleSignin} loading={loading} variant="primary">
                        Entrar
                    </Button>

                    <button onClick={voltarParaCPF} className="voltar-btn">
                        ← Voltar
                    </button>
                </>
            )}

            <p className="auth-link">
                Não tem conta? <a href="/signup">Cadastre-se</a>
            </p>
        </div>
    );
};

export default LoginForm;