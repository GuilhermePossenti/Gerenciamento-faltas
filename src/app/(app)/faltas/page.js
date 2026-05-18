'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { buscarFaltas, formatarData } from '../../../services/dataService';
import { turmas } from '../../../data';
import styles from './Faltas.module.css';

// Presets de período — H6 Nielsen: reconhecer ao invés de lembrar
const PRESETS = [
  { label: 'Este mês',   get: () => ({ ini: mesAtual(),    fim: hoje() } ) },
  { label: 'Últ. 30 dias', get: () => ({ ini: diasAtras(30), fim: hoje() } ) },
  { label: 'Últ. 60 dias', get: () => ({ ini: diasAtras(60), fim: hoje() } ) },
  { label: '1º Semestre', get: () => ({ ini: '2026-02-01', fim: '2026-06-30' }) },
  { label: 'Todo o ano', get: () => ({ ini: '2026-01-01', fim: '2026-12-31' }) },
];

function hoje()        { return new Date().toISOString().split('T')[0]; }
function diasAtras(n)  { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().split('T')[0]; }
function mesAtual()    { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-01`; }

// Wrapper para useSearchParams (necessário no static export)
function FaltasConteudo() {
  const params = useSearchParams();

  const [matricula,    setMatricula]    = useState(params.get('matricula') ?? '');
  const [nome,         setNome]         = useState('');
  const [turmaId,      setTurmaId]      = useState('');
  const [disciplinaId, setDisciplinaId] = useState('');
  const [dataInicio,   setDataInicio]   = useState('2026-02-01');
  const [dataFim,      setDataFim]      = useState(hoje());
  const [justificada,  setJustificada]  = useState('');
  const [buscado,      setBuscado]      = useState(false);
  const [resultado,    setResultado]    = useState([]);
  const [erro,         setErro]         = useState('');

  // Se veio com ?matricula=... executa busca automática
  useEffect(() => {
    if (params.get('matricula')) handleBuscar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Disciplinas disponíveis com base na turma selecionada
  const disciplinas = useMemo(() => {
    if (!turmaId) return [];
    return turmas.find((t) => t.id === turmaId)?.disciplinas ?? [];
  }, [turmaId]);

  // H5 Nielsen: validação antes de buscar
  const handleBuscar = (e) => {
    e?.preventDefault();
    if (dataInicio && dataFim && dataInicio > dataFim) {
      setErro('A data de início não pode ser posterior à data de fim.');
      return;
    }
    setErro('');
    const res = buscarFaltas({ matricula, nome, turmaId, disciplinaId, dataInicio, dataFim, justificada });
    setResultado(res);
    setBuscado(true);
  };

  const handleLimpar = () => {
    setMatricula(''); setNome(''); setTurmaId(''); setDisciplinaId('');
    setDataInicio('2026-02-01'); setDataFim(hoje()); setJustificada('');
    setResultado([]); setBuscado(false); setErro('');
  };

  const handlePreset = (preset) => {
    const { ini, fim } = preset.get();
    setDataInicio(ini);
    setDataFim(fim);
  };

  const totalJust    = resultado.filter((f) => f.justificada).length;
  const totalNaoJust = resultado.filter((f) => !f.justificada).length;

  return (
    <div className={styles.pagina}>
      {/* ── Cabeçalho ─────────────────────────────────────────── */}
      <div className={styles.cabecalho}>
        <div>
          <h1 className={styles.titulo}>Consulta de Faltas</h1>
          {/* H2 Nielsen: linguagem familiar — "período letivo" */}
          <p className={styles.subtitulo}>
            Busque por aluno, turma ou período letivo para visualizar as faltas
          </p>
        </div>
      </div>

      {/* ── Formulário de busca ───────────────────────────────── */}
      {/* Melhoria sobre o SIGAA: mais critérios, presets e feedback imediato */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Informe os Critérios de Busca</span>
          {/* H3 Nielsen: botão limpar sempre acessível */}
          <button onClick={handleLimpar} className="btn btn-ghost btn-sm">
            Limpar
          </button>
        </div>
        <div className="card-body">
          {/* H9 Nielsen: erro de validação claro */}
          {erro && (
            <div className={styles.alertaErro} role="alert">
              <span aria-hidden="true">⚠</span> {erro}
            </div>
          )}

          <form onSubmit={handleBuscar}>
            <div className={styles.gridFiltros}>

              {/* Linha 1: aluno */}
              <div className="form-group">
                <label className="form-label">Matrícula</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex.: 20240001"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ flex: '2 1 200px' }}>
                <label className="form-label">Nome do Aluno</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex.: Lucas"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              {/* Linha 2: turma e disciplina */}
              <div className="form-group">
                <label className="form-label">Turma</label>
                <select
                  className="form-control"
                  value={turmaId}
                  onChange={(e) => { setTurmaId(e.target.value); setDisciplinaId(''); }}
                >
                  <option value="">Todas as turmas</option>
                  {turmas.map((t) => (
                    <option key={t.id} value={t.id}>{t.nome} — {t.serie}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                {/* H5 Nielsen: desabilitado até turma ser selecionada */}
                <label className="form-label">
                  Disciplina
                  {/* H10 Nielsen: dica para usuário */}
                  {!turmaId && <span className="form-hint"> (selecione a turma primeiro)</span>}
                </label>
                <select
                  className="form-control"
                  value={disciplinaId}
                  onChange={(e) => setDisciplinaId(e.target.value)}
                  disabled={!turmaId}
                >
                  <option value="">Todas as disciplinas</option>
                  {disciplinas.map((d) => (
                    <option key={d.id} value={d.id}>{d.nome}</option>
                  ))}
                </select>
              </div>

              {/* Linha 3: período */}
              <div className="form-group">
                <label className="form-label">Data de Início</label>
                <input
                  type="date"
                  className="form-control"
                  value={dataInicio}
                  max={dataFim || hoje()}
                  onChange={(e) => setDataInicio(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Data de Fim</label>
                <input
                  type="date"
                  className="form-control"
                  value={dataFim}
                  min={dataInicio}
                  max={hoje()}
                  onChange={(e) => setDataFim(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Situação</label>
                <select
                  className="form-control"
                  value={justificada}
                  onChange={(e) => setJustificada(e.target.value)}
                >
                  <option value="">Todas</option>
                  <option value="false">Não justificada</option>
                  <option value="true">Justificada</option>
                </select>
              </div>
            </div>

            {/* H6 Nielsen: presets — reconhecer ao invés de digitar datas */}
            <div className={styles.presets}>
              <span className={styles.presetsLabel}>Período rápido:</span>
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => handlePreset(p)}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* H1 Nielsen: botão principal visualmente destacado */}
            <div className={styles.acoes}>
              <button type="submit" className="btn btn-primary">
                Buscar
              </button>
              {/* H3 Nielsen: cancelar / limpar */}
              <button type="button" className="btn btn-secondary" onClick={handleLimpar}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Resultados ───────────────────────────────────────── */}
      {buscado && (
        <div className="card">
          <div className="card-header">
            {/* H1 Nielsen: contagem de resultados */}
            <span className="card-title">
              {resultado.length} falta{resultado.length !== 1 ? 's' : ''} encontrada{resultado.length !== 1 ? 's' : ''}
            </span>
            {resultado.length > 0 && (
              <div className={styles.resumoBadges}>
                <span className="badge badge-nao-justif">{totalNaoJust} não justif.</span>
                <span className="badge badge-justif">{totalJust} justif.</span>
              </div>
            )}
          </div>

          {resultado.length === 0 ? (
            <div className="estado-vazio">
              <span className="estado-vazio-icone">📋</span>
              {/* H9 Nielsen: orienta o que fazer */}
              <span className="estado-vazio-titulo">Nenhuma falta encontrada</span>
              <span className="estado-vazio-subtitulo">
                Tente ampliar o período ou remover filtros para obter resultados.
              </span>
            </div>
          ) : (
            <div className="tabela-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Matrícula</th>
                    <th>Aluno</th>
                    <th>Turma</th>
                    <th>Disciplina</th>
                    <th>Situação</th>
                    <th>Motivo</th>
                  </tr>
                </thead>
                <tbody>
                  {resultado.map((f) => (
                    <tr key={f.id}>
                      <td className="text-muted">{formatarData(f.data)}</td>
                      <td className="text-muted">{f.alunoMatricula}</td>
                      <td className="font-medium">{f.alunoNome}</td>
                      <td><span className="badge badge-primary">{f.turmaId}</span></td>
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
          )}
        </div>
      )}
    </div>
  );
}

export default function FaltasPage() {
  return (
    <Suspense>
      <FaltasConteudo />
    </Suspense>
  );
}
