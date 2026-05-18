'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './Sidebar.module.css';

const NAV = [
  { href: '/dashboard',  label: 'Painel'     },
  { href: '/alunos',     label: 'Alunos'     },
  { href: '/faltas',     label: 'Faltas'     },
  { href: '/relatorios', label: 'Relatórios' },
];

export default function Sidebar() {
  const pathname  = usePathname();
  const { user, logout } = useAuth();
  const router    = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <aside className={styles.sidebar}>
      {/* Logotipo — H4: consistência de identidade visual */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>SF</div>
        <div className={styles.logoTexto}>
          <span className={styles.logoNome}>SisFreq</span>
          <span className={styles.logoSub}>Frequência Escolar</span>
        </div>
      </div>

      {/* Navegação principal — H6: reconhecer ao invés de lembrar */}
      <nav className={styles.nav}>
        <span className={styles.navLabel}>MENU</span>
        {NAV.map((item) => {
          const ativo = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${ativo ? styles.navItemAtivo : ''}`}
              aria-current={ativo ? 'page' : undefined}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Rodapé com usuário — H2: mostra quem está logado */}
      <div className={styles.rodape}>
        <div className={styles.usuario}>
          <div className={styles.avatar}>{user?.avatar}</div>
          <div className={styles.usuarioInfo}>
            <span className={styles.usuarioNome}>{user?.nome}</span>
            <span className={styles.usuarioCargo}>{user?.cargo}</span>
          </div>
        </div>
        {/* H3: controle — usuário pode sair a qualquer momento */}
        <button
          className={styles.btnSair}
          onClick={handleLogout}
          title="Sair do sistema"
          aria-label="Sair do sistema"
        >
          ⬅ Sair
        </button>
      </div>
    </aside>
  );
}
