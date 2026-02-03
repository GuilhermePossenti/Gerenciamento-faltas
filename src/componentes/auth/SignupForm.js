import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../services/authService';
import Input from '../ui/Input';
import Button from '../ui/Button';
import './SignupForm.css';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        senha: '',
        confirmarSenha: ''
    });
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [fieldSuccess, setFieldSuccess] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setFieldErrors(prev => ({ ...prev, [name]: '' }));
        setFieldSuccess(prev => ({ ...prev, [name]: '' }));
    };


    const handleEmailBlur = async () => {
        if (!formData.email) return;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setFieldErrors(prev => ({ ...prev, email: 'Email inválido' }));
            return;
        }

        try {
            await authService.checkEmail(formData.email);
            setFieldSuccess(prev => ({ ...prev, email: 'Email disponível' }));
        } catch (err) {
            setFieldErrors(prev => ({ ...prev, email: 'Email já está em uso' }));
        }
    };

    const handlePhoneBlur = async () => {
        if (!formData.telefone) return;

        const phoneRegex = /^\d{10,11}$/;
        if (!phoneRegex.test(formData.telefone)) {
            setFieldErrors(prev => ({ ...prev, telefone: 'Use apenas números (10 ou 11 dígitos)' }));
            return;
        }

        try {
            await authService.checkPhone(formData.telefone);
            setFieldSuccess(prev => ({ ...prev, telefone: 'Telefone disponível' }));
        } catch (err) {
            setFieldErrors(prev => ({ ...prev, telefone: 'Telefone já está em uso' }));
        }
    };

    const validar = () => {
        const erros = {};
        if (!formData.nome.trim()) erros.nome = 'Nome é obrigatório';
        if (!formData.email.trim()) erros.email = 'Email é obrigatório';
        if (!formData.telefone.trim()) erros.telefone = 'Telefone é obrigatório';
        if (!formData.cpf.trim()) erros.cpf = 'CPF é obrigatório';
        if (!formData.senha.trim()) erros.senha = 'Senha é obrigatória';
        if (formData.senha.length < 6) erros.senha = 'Senha deve ter pelo menos 6 caracteres';
        if (formData.senha !== formData.confirmarSenha) erros.confirmarSenha = 'Senhas não coincidem';
        setFieldErrors(erros);
        return Object.keys(erros).length === 0;
    };

    const handleSubmit = async () => {
        if (!validar()) return;

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await authService.signup({
                nome: formData.nome,
                email: formData.email,
                telefone: formData.telefone,
                username: formData.cpf,
                password: formData.senha
            });

            setSuccess('Cadastro realizado com sucesso!');
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.erro || 'Erro ao cadastrar. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-form">
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <Input
                label="Nome completo"
                name="nome"
                placeholder="João Silva"
                value={formData.nome}
                onChange={handleChange}
                error={fieldErrors.nome}
            />

            <Input
                label="Email"
                name="email"
                type="email"
                placeholder="joao@email.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleEmailBlur}
                error={fieldErrors.email}
                success={fieldSuccess.email}
            />

            <Input
                label="Telefone"
                name="telefone"
                placeholder="11999999999"
                value={formData.telefone}
                onChange={handleChange}
                onBlur={handlePhoneBlur}
                error={fieldErrors.telefone}
                success={fieldSuccess.telefone}
            />

            <Input
                label="CPF (será seu usuário)"
                name="cpf"
                placeholder="12345678901"
                value={formData.cpf}
                onChange={handleChange}
                error={fieldErrors.cpf}
            />

            <Input
                label="Senha"
                name="senha"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.senha}
                onChange={handleChange}
                error={fieldErrors.senha}
            />

            <Input
                label="Confirmar senha"
                name="confirmarSenha"
                type="password"
                placeholder="Repita a senha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                error={fieldErrors.confirmarSenha}
            />

            <Button onClick={handleSubmit} loading={loading} variant="primary">
                Cadastrar
            </Button>

            <p className="auth-link">
                Já tem uma conta? <a href="/login">Faça login</a>
            </p>
        </div>
    );
};

export default SignupForm;