'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

// Usuários fictícios do sistema
const USUARIOS = [
  { id: 1, login: 'diretor',    senha: 'escola123', nome: 'Dr. Antônio Pereira',   cargo: 'Diretor',    avatar: 'AP' },
  { id: 2, login: 'secretaria', senha: 'escola123', nome: 'Sra. Cláudia Monteiro', cargo: 'Secretaria', avatar: 'CM' },
  { id: 3, login: 'admin',      senha: 'admin123',  nome: 'Administrador',         cargo: 'Admin',      avatar: 'AD' },
];

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sisfreq_user');
      if (saved) setUser(JSON.parse(saved));
    } catch {
      localStorage.removeItem('sisfreq_user');
    } finally {
      setLoading(false);
    }
  }, []);

  // H9 Nielsen: retorna mensagem de erro clara
  const login = (loginInput, senha) => {
    const usuario = USUARIOS.find(
      (u) => u.login === loginInput.trim().toLowerCase() && u.senha === senha
    );
    if (!usuario) {
      return { ok: false, erro: 'Login ou senha incorretos. Verifique os dados e tente novamente.' };
    }
    const { senha: _, ...dadosPublicos } = usuario;
    setUser(dadosPublicos);
    localStorage.setItem('sisfreq_user', JSON.stringify(dadosPublicos));
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sisfreq_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
};
