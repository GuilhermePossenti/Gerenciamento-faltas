'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getAlunos } from '../../../services/dataService';
import styles from './Alunos.module.css';

export default function AlunosPage() {
  const todosAlunos = useMemo(() => getAlunos(), []);

  const [busca,   setBusca]   = useState('');
  const [turma,   setTurma]   = useState('');
  const [situacao, setSituacao] = useState('');
  const [alunoDetalhe, setAlunoDetalhe] = useState(null);

  // Turmas únicas para o filtro
  const turmas = useMemo(
    () => [...new Set(todosAlunos.map((a) => a.turma))].sort(),
    [todosAlunos]
  );

  // H7 Nielsen: filtros múltiplos combinados
  const alunosFiltrados = useMemo(() => {
    return todosAlunos.filter((a) => {
      const termoBusca = busca.trim().toLowerCase();
      if (termoBusca && !a.nome.toLowerCase().includes(termoBusca) && !a.matricula.includes(termoBusca)) return false;
      if (turma    && a.turma              !== turma)    return false;
      if (situacao && a.situacao.cor       !== situacao) return false;
      return true;
    });
  }, [todosAlunos, busca, turma, situacao]);

  const limparFiltros = () => { setBusca(''); setTurma(''); setSituacao(''); };
  const filtrosAtivos = busca || turma || situacao;

  return (
    <div className={styles.pagina}>
      {/* ── Cabeçalho ───────────────────────────────────────── */}
      <div className={styles.cabecalho}>
        <div>
          <h1 className={styles.titulo}>Alunos</h1>
          <p className={styles.subtitulo}>{todosAlunos.length} alunos matriculados</p>
        </div>
      </div>

      {/* ── Painel de busca ──────────────────────────────────── */}
      {/* H7 Nielsen: múltiplos critérios de busca */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Filtrar Alunos</span>
          {/* H3 Nielsen: liberdade — limpar filtros facilmente */}
          {filtrosAtivos && (
            <button onClick={limparFiltros} className="btn btn-ghost btn-sm">
              Limpar filtros
            </button>
          )}
        </div>
        <div className="card-body">
          <div className={styles.filtros}>
            <div className="form-group" style={{ flex: '2 1 200px' }}>
              {/* H6 Nielsen: placeholder orienta o usuário */}
              <label className="form-label">Matrícula ou Nome</label>
              <input
                type="search"
                className="form-control"
                placeholder="Buscar por matrícula ou nome…"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ flex: '1 1 140px' }}>
              <label className="form-label">Turma</label>
              <select
                className="form-control"
                value={turma}
                onChange={(e) => setTurma(e.target.value)}
              >
                <option value="">Todas</option>
                {turmas.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ flex: '1 1 140px' }}>
              {/* H1 Nielsen: filtro por situação usa as mesmas cores semânticas */}
              <label className="form-label">Situação</label>
              <select
                className="form-control"
                value={situacao}
                onChange={(e) => setSituacao(e.target.value)}
              >
                <option value="">Todas</option>
                <option value="reprovado">Reprovado</option>
                <option value="risco">Risco</option>
                <option value="atencao">Atenção</option>
                <option value="regular">Regular</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabela de resultados ──────────────────────────────── */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">
            {/* H1 Nielsen: mostra contagem de resultados */}
            {alunosFiltrados.length} aluno{alunosFiltrados.length !== 1 ? 's' : ''} encontrado{alunosFiltrados.length !== 1 ? 's' : ''}
          </span>
        </div>
        {alunosFiltrados.length === 0 ? (
          <div className="estado-vazio">
            <span className="estado-vazio-icone">🔍</span>
            {/* H9 Nielsen: mensagem clara + dica */}
            <span className="estado-vazio-titulo">Nenhum aluno encontrado</span>
            <span className="estado-vazio-subtitulo">Tente outros critérios ou{' '}
              <button onClick={limparFiltros} className={styles.linkLimpar}>limpe os filtros</button>.
            </span>
          </div>
        ) : (
          <div className="tabela-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Matrícula</th>
                  <th>Nome</th>
                  <th>Turma</th>
                  <th>Série</th>
                  <th>Faltas</th>
                  <th>Freq. Mínima</th>
                  <th>Situação</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunosFiltrados.map((aluno) => (
                  <tr key={aluno.id}>
                    <td className="text-muted font-medium">{aluno.matricula}</td>
                    <td className="font-medium">{aluno.nome}</td>
                    <td><span className="badge badge-primary">{aluno.turma}</span></td>
                    <td>{aluno.serie}</td>
                    <td className="font-medium">{aluno.totalFaltas}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <span className={`font-bold ${
                          aluno.situacao.cor === 'reprovado' ? 'text-danger' :
                          aluno.situacao.cor === 'risco'     ? 'text-danger' :
                          aluno.situacao.cor === 'atencao'   ? 'text-warning' : 'text-success'
                        }`}>
                          {aluno.frequenciaMin}%
                        </span>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                          {aluno.disciplinaCritica}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${aluno.situacao.cor}`}>
                        {aluno.situacao.label}
                      </span>
                    </td>
                    <td>
                      {/* H7 Nielsen: acesso direto ao detalhe */}
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setAlunoDetalhe(aluno)}
                        title={`Ver detalhes de ${aluno.nome}`}
                      >
                        Ver detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Modal de detalhe do aluno ─────────────────────────── */}
      {alunoDetalhe && (
        <DetalheAluno aluno={alunoDetalhe} onFechar={() => setAlunoDetalhe(null)} />
      )}
    </div>
  );
}

function DetalheAluno({ aluno, onFechar }) {
  const totalFaltasNaoJust = aluno.faltas
    ? aluno.faltas.filter((f) => !f.justificada).length
    : 0;

  return (
    <div className={styles.modalOverlay} onClick={onFechar} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitulo}>{aluno.nome}</h2>
          {/* H3 Nielsen: fechar / sair sempre disponível */}
          <button className="btn btn-ghost" onClick={onFechar} aria-label="Fechar detalhes">Fechar</button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalGrid}>
            <div className={styles.campo}>
              <span className={styles.campoLabel}>Matrícula</span>
              <span>{aluno.matricula}</span>
            </div>
            <div className={styles.campo}>
              <span className={styles.campoLabel}>Turma / Série</span>
              <span>{aluno.turma} — {aluno.serie}</span>
            </div>
            <div className={styles.campo}>
              <span className={styles.campoLabel}>Responsável</span>
              <span>{aluno.responsavel}</span>
            </div>
            <div className={styles.campo}>
              <span className={styles.campoLabel}>Telefone</span>
              <span>{aluno.telefone}</span>
            </div>
            <div className={styles.campo}>
              <span className={styles.campoLabel}>Situação Geral</span>
              <span className={`badge badge-${aluno.situacao.cor}`}>
                {aluno.situacao.label}
              </span>
            </div>
            <div className={styles.campo}>
              <span className={styles.campoLabel}>Frequência Mínima</span>
              <span className="font-bold">{aluno.frequenciaMin}% — {aluno.disciplinaCritica}</span>
            </div>
            <div className={styles.campo}>
              <span className={styles.campoLabel}>Total de Faltas</span>
              <span>{aluno.totalFaltas} ({totalFaltasNaoJust} não justif.)</span>
            </div>
          </div>

          {/* Tabela de frequência por disciplina */}
          {aluno.porDisciplina && aluno.porDisciplina.length > 0 && (
            <>
              <hr style={{ margin: '16px 0', borderColor: 'var(--border)' }} />
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                Frequência por Disciplina — 1º Bimestre (5 semanas)
              </h3>
              <div className="tabela-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Disciplina</th>
                      <th>Total Aulas</th>
                      <th>Faltas</th>
                      <th>Presenças</th>
                      <th>Frequência</th>
                      <th>Situação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aluno.porDisciplina.map((d) => (
                      <tr key={d.disciplinaId}>
                        <td className="font-medium">{d.disciplinaNome}</td>
                        <td className="text-muted">{d.totalAulas}</td>
                        <td className={d.totalFaltas > 0 ? 'text-danger font-medium' : ''}>
                          {d.totalFaltas}
                        </td>
                        <td>{d.presencas}</td>
                        <td className="font-bold">{d.frequencia}%</td>
                        <td>
                          <span className={`badge badge-${d.situacao.cor}`}>
                            {d.situacao.label}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {aluno.faltas && aluno.faltas.length > 0 && (
            <>
              <hr style={{ margin: '16px 0', borderColor: 'var(--border)' }} />
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Histórico de Faltas</h3>
              <div className="tabela-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Disciplina</th>
                      <th>Situação</th>
                      <th>Motivo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aluno.faltas
                      .sort((a, b) => b.data.localeCompare(a.data))
                      .map((f) => (
                        <tr key={f.id}>
                          <td className="text-muted">
                            {new Date(f.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                          </td>
                          <td>{f.disciplinaNome}</td>
                          <td>
                            <span className={f.justificada ? 'badge badge-justif' : 'badge badge-nao-justif'}>
                              {f.justificada ? 'Justificada' : 'Não justif.'}
                            </span>
                          </td>
                          <td className="text-muted">{f.motivo ?? '—'}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        <div className={styles.modalFooter}>
          {/* H7 Nielsen: ir direto para busca de faltas do aluno */}
          <Link
            href={`/faltas?matricula=${aluno.matricula}`}
            className="btn btn-primary btn-sm"
          >
            Ver faltas detalhadas
          </Link>
          <button className="btn btn-secondary btn-sm" onClick={onFechar}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
