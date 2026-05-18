'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { getEstatisticas, formatarData } from '../../../services/dataService';
import styles from './Dashboard.module.css';

export default function DashboardPage() {
  const stats = useMemo(() => getEstatisticas(), []);

  return (
    <div className={styles.pagina}>
      <div className={styles.cabecalho}>
        <div>
          <h1 className={styles.titulo}>Painel de Controle</h1>
          <p className={styles.subtitulo}>
            Frequência — Ano Letivo 2026 · 1º Bimestre (referência: 5 semanas)
          </p>
        </div>
        <Link href="/faltas" className="btn btn-primary">
          Consultar Faltas
        </Link>
      </div>

      {/* H1 Nielsen: status visível de todos os alunos de relance */}
      <div className={styles.cards}>
        <div className={`${styles.card} ${styles.cardBlue}`}>
          <div className={styles.cardInfo}>
            <span className={styles.cardValor}>{stats.totalAlunos}</span>
            <span className={styles.cardLabel}>Total de Alunos</span>
          </div>
        </div>

        <div className={`${styles.card} ${styles.cardDarkRed}`}>
          <div className={styles.cardInfo}>
            <span className={styles.cardValor}>{stats.reprovados}</span>
            <span className={styles.cardLabel}>Reprovados por Falta</span>
            <span className={styles.cardSub}>Frequência &lt; 75%</span>
          </div>
        </div>

        <div className={`${styles.card} ${styles.cardRed}`}>
          <div className={styles.cardInfo}>
            <span className={styles.cardValor}>{stats.emRisco}</span>
            <span className={styles.cardLabel}>Em Risco</span>
            <span className={styles.cardSub}>Frequência 75% – 80%</span>
          </div>
        </div>

        <div className={`${styles.card} ${styles.cardYellow}`}>
          <div className={styles.cardInfo}>
            <span className={styles.cardValor}>{stats.emAtencao}</span>
            <span className={styles.cardLabel}>Em Atenção</span>
            <span className={styles.cardSub}>Frequência 80% – 90%</span>
          </div>
        </div>
      </div>

      <div className={styles.grade}>
        {/* Tabela de últimas faltas */}
        <div className="card" style={{ flex: '1 1 560px' }}>
          <div className="card-header">
            <span className="card-title">Últimas Faltas Registradas</span>
            <Link href="/faltas" className="btn btn-ghost btn-sm">Ver todas</Link>
          </div>
          <div className="tabela-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Aluno</th>
                  <th>Turma</th>
                  <th>Disciplina</th>
                  <th>Situação</th>
                </tr>
              </thead>
              <tbody>
                {stats.ultimasFaltas.map((f) => (
                  <tr key={f.id}>
                    <td className="text-muted">{formatarData(f.data)}</td>
                    <td>
                      <span className="font-medium">{f.alunoNome}</span>
                      <br />
                      <span className="text-muted" style={{ fontSize: 11 }}>{f.alunoMatricula}</span>
                    </td>
                    <td><span className="badge badge-primary">{f.turmaId}</span></td>
                    <td>{f.disciplinaNome}</td>
                    <td>
                      <span className={f.justificada ? 'badge badge-justif' : 'badge badge-nao-justif'}>
                        {f.justificada ? 'Justificada' : 'Não justif.'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lateral */}
        <div className={styles.lateral}>
          {/* H6 Nielsen: legenda sempre visível */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Situações de Frequência</span>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className={styles.legendaItem}>
                <span className="badge badge-reprovado">Reprovado</span>
                <span className="text-muted" style={{ fontSize: 13 }}>Abaixo de 75% — reprovado por falta</span>
              </div>
              <div className={styles.legendaItem}>
                <span className="badge badge-risco">Risco</span>
                <span className="text-muted" style={{ fontSize: 13 }}>Entre 75% e 80% — acompanhamento urgente</span>
              </div>
              <div className={styles.legendaItem}>
                <span className="badge badge-atencao">Atenção</span>
                <span className="text-muted" style={{ fontSize: 13 }}>Entre 80% e 90% — monitorar frequência</span>
              </div>
              <div className={styles.legendaItem}>
                <span className="badge badge-regular">Regular</span>
                <span className="text-muted" style={{ fontSize: 13 }}>Acima de 90% — frequência adequada</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">Acesso Rápido</span>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/alunos" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                Ver lista de alunos
              </Link>
              <Link href="/faltas" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                Buscar faltas por período
              </Link>
              <Link href="/relatorios" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                Alunos reprovados e em risco
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
