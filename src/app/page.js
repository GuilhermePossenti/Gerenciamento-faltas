'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';

export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();

  const [loginInput, setLoginInput] = useState('');
  const [senha, setSenha]           = useState('');
  const [erro, setErro]             = useState('');
  const [carregando, setCarregando] = useState(false);

  // H3 Nielsen: redireciona se já autenticado
  useEffect(() => {
    if (!loading && user) router.replace('/dashboard');
  }, [user, loading, router]);

  if (loading) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // H5 Nielsen: valida antes de enviar
    if (!loginInput.trim() || !senha) {
      setErro('Preencha o login e a senha para continuar.');
      return;
    }
    setCarregando(true);
    setErro('');
    await new Promise((r) => setTimeout(r, 600));
    const resultado = login(loginInput, senha);
    setCarregando(false);
    if (resultado.ok) {
      router.push('/dashboard');
    } else {
      // H9 Nielsen: mensagem clara e orientada à ação
      setErro(resultado.erro);
    }
  };

  return (
    <div className={styles.pagina}>
      <div className={styles.card}>
        {/* Identidade da escola — H2: terminologia familiar ao mundo real */}
        <div className={styles.cabecalho}>
          <div className={styles.logo}>
            <span className={styles.logoSigla}>SF</span>
          </div>
          <h1 className={styles.titulo}>SisFreq</h1>
          <p className={styles.subtitulo}>Sistema de Frequência Escolar</p>
          <p className={styles.escola}>Instituto Federal Catarinense - Campus Videira</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* H9 Nielsen: erro visível, descritivo e com orientação */}
          {erro && (
            <div className={styles.alertaErro} role="alert">
              <span aria-hidden="true">⚠</span> {erro}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="login" className="form-label">Login</label>
            <input
              id="login"
              type="text"
              className="form-control"
              placeholder="Ex.: diretor, secretaria"
              value={loginInput}
              onChange={(e) => { setLoginInput(e.target.value); setErro(''); }}
              autoComplete="username"
              autoFocus
              disabled={carregando}
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha" className="form-label">Senha</label>
            <input
              id="senha"
              type="password"
              className="form-control"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => { setSenha(e.target.value); setErro(''); }}
              autoComplete="current-password"
              disabled={carregando}
            />
          </div>

          {/* H1 Nielsen: botão com feedback de carregamento */}
          <button
            type="submit"
            className={`btn btn-primary btn-lg ${styles.btnEntrar}`}
            disabled={carregando}
            aria-busy={carregando}
          >
            {carregando
              ? <><span className="spinner" aria-hidden="true" /> Entrando…</>
              : 'Entrar'}
          </button>
        </form>

        {/* H6 & H10 Nielsen: credenciais disponíveis para demo */}
        <details className={styles.ajuda}>
          <summary>Credenciais de demonstração</summary>
          <table className={styles.tabelaDemo}>
            <thead><tr><th>Login</th><th>Senha</th><th>Perfil</th></tr></thead>
            <tbody>
              <tr><td>diretor</td><td>escola123</td><td>Diretor</td></tr>
              <tr><td>secretaria</td><td>escola123</td><td>Secretaria</td></tr>
              <tr><td>admin</td><td>admin123</td><td>Admin</td></tr>
            </tbody>
          </table>
        </details>
      </div>
    </div>
  );
}
