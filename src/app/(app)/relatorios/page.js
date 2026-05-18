'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { getAlunos, getTurmas } from '../../../services/dataService';
import styles from './Relatorios.module.css';

export default function RelatoriosPage() {
  const alunos = useMemo(() => getAlunos(), []);
  const turmas = useMemo(() => getTurmas(), []);

  const reprovados = useMemo(() => alunos.filter((a) => a.situacao.cor === 'reprovado').sort((a, b) => a.frequenciaMin - b.frequenciaMin), [alunos]);
  const emRisco    = useMemo(() => alunos.filter((a) => a.situacao.cor === 'risco')   .sort((a, b) => a.frequenciaMin - b.frequenciaMin), [alunos]);
  const emAtencao  = useMemo(() => alunos.filter((a) => a.situacao.cor === 'atencao') .sort((a, b) => a.frequenciaMin - b.frequenciaMin), [alunos]);
  const regulares  = useMemo(() => alunos.filter((a) => a.situacao.cor === 'regular'), [alunos]);

  return (
    <div className={styles.pagina}>
      {/* ── Cabeçalho ─────────────────────────────────────────── */}
      <div className={styles.cabecalho}>
        <div>
          <h1 className={styles.titulo}>Relatórios</h1>
          <p className={styles.subtitulo}>Resumo de frequência — Ano Letivo 2026 · 1º Semestre</p>
        </div>
      </div>

      {/* ── Resumo geral ─────────────────────────────────────── */}
      {/* H8 Nielsen: apenas informações essenciais no resumo */}
      <div className={styles.resumoCards}>
        <div className={`${styles.resumo} ${styles.resumoDarkRed}`}>
          <span className={styles.resumoValor}>{reprovados.length}</span>
          <span className={styles.resumoLabel}>Reprovados por Falta</span>
          <span className={styles.resumoSub}>Frequência &lt; 75%</span>
        </div>
        <div className={`${styles.resumo} ${styles.resumoRed}`}>
          <span className={styles.resumoValor}>{emRisco.length}</span>
          <span className={styles.resumoLabel}>Em Risco</span>
          <span className={styles.resumoSub}>Frequência 75% – 80%</span>
        </div>
        <div className={`${styles.resumo} ${styles.resumoYellow}`}>
          <span className={styles.resumoValor}>{emAtencao.length}</span>
          <span className={styles.resumoLabel}>Em Atenção</span>
          <span className={styles.resumoSub}>Frequência 80% – 90%</span>
        </div>
        <div className={`${styles.resumo} ${styles.resumoGreen}`}>
          <span className={styles.resumoValor}>{regulares.length}</span>
          <span className={styles.resumoLabel}>Regular</span>
          <span className={styles.resumoSub}>Frequência ≥ 90%</span>
        </div>
      </div>

      {/* ── Alunos REPROVADOS ────────────────────────────────── */}
      <div className="card">
        <div className="card-header">
          <span className="card-title" style={{ color: '#991b1b' }}>
            Reprovados por Falta ({reprovados.length})
          </span>
          <span className="badge badge-reprovado">Frequência &lt; 75%</span>
        </div>
        {reprovados.length === 0 ? (
          <div className="estado-vazio">
            <span className="estado-vazio-titulo">Nenhum aluno reprovado</span>
            <span className="estado-vazio-subtitulo">Todos os alunos têm frequência acima de 75%.</span>
          </div>
        ) : (
          <div className="tabela-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Matrícula</th>
                  <th>Nome</th>
                  <th>Turma</th>
                  <th>Freq. Mínima</th>
                  <th>Disciplina Crítica</th>
                  <th>Situação</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {reprovados.map((a) => (
                  <tr key={a.id}>
                    <td className="text-muted">{a.matricula}</td>
                    <td className="font-semibold">{a.nome}</td>
                    <td><span className="badge badge-primary">{a.turma}</span></td>
                    <td className="font-bold text-danger">{a.frequenciaMin}%</td>
                    <td className="text-muted">{a.disciplinaCritica}</td>
                    <td><span className="badge badge-reprovado">Reprovado</span></td>
                    <td>
                      <Link href={`/faltas?matricula=${a.matricula}`} className="btn btn-ghost btn-sm">
                        Ver faltas
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Alunos em RISCO ──────────────────────────────────── */}
      <div className="card">
        <div className="card-header">
          <span className="card-title" style={{ color: 'var(--danger)' }}>
            Alunos em Risco ({emRisco.length})
          </span>
          <span className="badge badge-risco">Frequência 75% – 80%</span>
        </div>
        {emRisco.length === 0 ? (
          <div className="estado-vazio">
            <span className="estado-vazio-icone">✅</span>
            <span className="estado-vazio-titulo">Nenhum aluno em risco</span>
            <span className="estado-vazio-subtitulo">Todos os alunos estão com frequência regular.</span>
          </div>
        ) : (
          <div className="tabela-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Matrícula</th>
                  <th>Nome</th>
                  <th>Turma</th>
                  <th>Freq. Mínima</th>
                  <th>Disciplina Crítica</th>
                  <th>Situação</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {emRisco.map((a) => (
                  <tr key={a.id}>
                    <td className="text-muted">{a.matricula}</td>
                    <td className="font-semibold">{a.nome}</td>
                    <td><span className="badge badge-primary">{a.turma}</span></td>
                    <td className="font-bold text-danger">{a.frequenciaMin}%</td>
                    <td className="text-muted">{a.disciplinaCritica}</td>
                    <td><span className="badge badge-risco">Risco</span></td>
                    <td>
                      <Link href={`/faltas?matricula=${a.matricula}`} className="btn btn-ghost btn-sm">
                        Ver faltas
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Alunos em ATENÇÃO ─────────────────────────────────── */}
      <div className="card">
        <div className="card-header">
          <span className="card-title" style={{ color: 'var(--warning)' }}>
            Alunos em Atenção ({emAtencao.length})
          </span>
          <span className="badge badge-atencao">Monitorar</span>
        </div>
        {emAtencao.length === 0 ? (
          <div className="estado-vazio">
            <span className="estado-vazio-icone">✅</span>
            <span className="estado-vazio-titulo">Nenhum aluno em atenção</span>
          </div>
        ) : (
          <div className="tabela-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Matrícula</th>
                  <th>Nome</th>
                  <th>Turma</th>
                  <th>Freq. Mínima</th>
                  <th>Disciplina Crítica</th>
                  <th>Situação</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {emAtencao.map((a) => (
                  <tr key={a.id}>
                    <td className="text-muted">{a.matricula}</td>
                    <td className="font-semibold">{a.nome}</td>
                    <td><span className="badge badge-primary">{a.turma}</span></td>
                    <td className="font-bold text-warning">{a.frequenciaMin}%</td>
                    <td className="text-muted">{a.disciplinaCritica}</td>
                    <td><span className="badge badge-atencao">Atenção</span></td>
                    <td>
                      <Link
                        href={`/faltas?matricula=${a.matricula}`}
                        className="btn btn-ghost btn-sm"
                      >
                        Ver faltas
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Resumo por turma ──────────────────────────────────── */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Faltas por Turma</span>
        </div>
        <div className="tabela-wrapper">
          <table>
            <thead>
              <tr>
                <th>Turma</th>
                <th>Série</th>
                <th>Turno</th>
                <th>Alunos</th>
                <th>Total Faltas</th>
                <th>Média/Aluno</th>
              </tr>
            </thead>
            <tbody>
              {turmas
                .sort((a, b) => b.totalFaltas - a.totalFaltas)
                .map((t) => {
                  const media = t.totalAlunos > 0
                    ? (t.totalFaltas / t.totalAlunos).toFixed(1)
                    : '0.0';
                  return (
                    <tr key={t.id}>
                      <td><span className="badge badge-primary">{t.nome}</span></td>
                      <td>{t.serie}</td>
                      <td>{t.turno}</td>
                      <td>{t.totalAlunos}</td>
                      <td className="font-semibold">{t.totalFaltas}</td>
                      <td className="text-muted">{media}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
