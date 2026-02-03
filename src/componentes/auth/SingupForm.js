'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../services/authService';
import Input from '../ui/Input';
import Button from '../ui/Button';
import './SingupForm.css';

const SingupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        identifier: '',
        address: '',
        complement: '',
        birthday: '',
        zipCode: '',
        password: '',
        passwordConfirm: ''
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
        if (!formData.name.trim()) erros.name = 'Nome é obrigatório';
        if (!formData.email.trim()) erros.email = 'Email é obrigatório';
        if (!formData.phone.trim()) erros.phone = 'Telefone é obrigatório';
        if (!formData.identifier.trim()) erros.identifier = 'CPF/Identificador é obrigatório';
        if (!formData.address.trim()) erros.address = 'Endereço é obrigatório';
        if (!formData.birthday.trim()) erros.birthday = 'Data de nascimento é obrigatória';
        if (!formData.zipCode.trim()) erros.zipCode = 'CEP é obrigatório';
        if (!formData.password.trim()) erros.password = 'Senha é obrigatória';
        if (formData.password.length < 6) erros.password = 'Senha deve ter pelo menos 6 caracteres';
        if (formData.password !== formData.passwordConfirm) erros.passwordConfirm = 'Senhas não coincidem';
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
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                identifier: formData.identifier,
                address: formData.address,
                complement: formData.complement,
                birthday: formData.birthday,
                zipCode: formData.zipCode,
                password: formData.password,
                passwordConfirm: formData.passwordConfirm
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
                name="name"
                placeholder="Guilherme Possenti"
                value={formData.name}
                onChange={handleChange}
                error={fieldErrors.name}
            />

            <Input
                label="Email"
                name="email"
                type="email"
                placeholder="gui.possenti789@gmail.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleEmailBlur}
                error={fieldErrors.email}
                success={fieldSuccess.email}
            />

            <Input
                label="Telefone"
                name="phone"
                placeholder="49999306867"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handlePhoneBlur}
                error={fieldErrors.phone}
                success={fieldSuccess.phone}
            />

            <Input
                label="CPF/Identificador (será seu usuário)"
                name="identifier"
                placeholder="12345678901"
                value={formData.identifier}
                onChange={handleChange}
                error={fieldErrors.identifier}
            />

            <Input
                label="Endereço"
                name="address"
                placeholder="Rua Principal, 123"
                value={formData.address}
                onChange={handleChange}
                error={fieldErrors.address}
            />

            <Input
                label="Complemento (opcional)"
                name="complement"
                placeholder="Apto 45"
                value={formData.complement}
                onChange={handleChange}
            />

            <Input
                label="Data de Nascimento"
                name="birthday"
                placeholder="DD/MM/YYYY"
                value={formData.birthday}
                onChange={handleChange}
                error={fieldErrors.birthday}
            />

            <Input
                label="CEP"
                name="zipCode"
                placeholder="89801331"
                value={formData.zipCode}
                onChange={handleChange}
                error={fieldErrors.zipCode}
            />

            <Input
                label="Senha"
                name="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
                error={fieldErrors.password}
            />

            <Input
                label="Confirmar senha"
                name="passwordConfirm"
                type="password"
                placeholder="Repita a senha"
                value={formData.passwordConfirm}
                onChange={handleChange}
                error={fieldErrors.passwordConfirm}
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

export default SingupForm;