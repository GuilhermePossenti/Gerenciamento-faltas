import { alunos, turmas, faltas } from '../data';

// Semanas de aula realizadas no 1º bimestre (referência do demo)
const SEMANAS_REALIZADAS = 5;

function totalAulasDisciplina(aulasSemanais) {
  return aulasSemanais * SEMANAS_REALIZADAS;
}

// Regras de frequência mínima (Lei de Diretrizes e Bases – LDB)
export function getSituacao(frequencia) {
  if (frequencia <  75) return { label: 'Reprovado', cor: 'reprovado' };
  if (frequencia <  80) return { label: 'Risco',     cor: 'risco'     };
  if (frequencia <  90) return { label: 'Atenção',   cor: 'atencao'   };
  return                       { label: 'Regular',   cor: 'regular'   };
}

export function formatarData(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

// Calcula frequência por disciplina e retorna o pior caso do aluno
export function getFrequenciaAluno(alunoId, turmaId) {
  const turma = turmas.find((t) => t.id === turmaId);
  if (!turma) {
    return { frequenciaMin: 100, disciplinaCritica: '—', situacao: getSituacao(100), porDisciplina: [] };
  }

  const porDisciplina = turma.disciplinas.map((disc) => {
    const totalFaltas = faltas.filter(
      (f) => f.alunoId === alunoId && f.disciplinaId === disc.id
    ).length;
    const totalAulas = totalAulasDisciplina(disc.aulasSemanais);
    const presencas  = Math.max(0, totalAulas - totalFaltas);
    const freq       = (presencas / totalAulas) * 100;
    return {
      disciplinaId:   disc.id,
      disciplinaNome: disc.nome,
      professor:      disc.professor,
      totalAulas,
      totalFaltas,
      presencas,
      frequencia:     Math.round(freq * 10) / 10,
      situacao:       getSituacao(freq),
    };
  });

  // Situação geral = pior disciplina
  const pior = porDisciplina.reduce((a, b) => (b.frequencia < a.frequencia ? b : a));

  return {
    frequenciaMin:    pior.frequencia,
    disciplinaCritica: pior.disciplinaNome,
    situacao:         getSituacao(pior.frequencia),
    porDisciplina,
  };
}

// ── Alunos ────────────────────────────────────────────────────────────────

export function getAlunos() {
  return alunos.map((a) => {
    const totalFaltas = faltas.filter((f) => f.alunoId === a.id).length;
    const freq = getFrequenciaAluno(a.id, a.turma);
    return { ...a, totalFaltas, ...freq };
  });
}

export function getAlunoPorId(id) {
  const aluno = alunos.find((a) => a.id === Number(id));
  if (!aluno) return null;
  const faltasDoAluno = faltas.filter((f) => f.alunoId === aluno.id);
  const freq = getFrequenciaAluno(aluno.id, aluno.turma);
  return {
    ...aluno,
    totalFaltas: faltasDoAluno.length,
    ...freq,
    faltas: faltasDoAluno,
  };
}

// ── Turmas ────────────────────────────────────────────────────────────────

export function getTurmas() {
  return turmas.map((t) => {
    const alunosDaTurma = alunos.filter((a) => a.turma === t.id);
    const faltasDaTurma = faltas.filter((f) => f.turmaId === t.id);
    return { ...t, totalAlunos: alunosDaTurma.length, totalFaltas: faltasDaTurma.length };
  });
}

// ── Faltas ────────────────────────────────────────────────────────────────

export function buscarFaltas({ matricula, nome, turmaId, disciplinaId, dataInicio, dataFim, justificada } = {}) {
  return faltas
    .filter((f) => {
      const aluno = alunos.find((a) => a.id === f.alunoId);
      if (!aluno) return false;
      if (matricula    && !aluno.matricula.includes(matricula.trim())) return false;
      if (nome         && !aluno.nome.toLowerCase().includes(nome.trim().toLowerCase())) return false;
      if (turmaId      && f.turmaId !== turmaId) return false;
      if (disciplinaId && f.disciplinaId !== Number(disciplinaId)) return false;
      if (dataInicio   && f.data < dataInicio) return false;
      if (dataFim      && f.data > dataFim)   return false;
      if (justificada !== undefined && justificada !== '' && f.justificada !== (justificada === 'true')) return false;
      return true;
    })
    .map((f) => {
      const aluno = alunos.find((a) => a.id === f.alunoId);
      return { ...f, alunoNome: aluno.nome, alunoMatricula: aluno.matricula };
    })
    .sort((a, b) => b.data.localeCompare(a.data));
}

// ── Dashboard ─────────────────────────────────────────────────────────────

export function getEstatisticas() {
  const totalAlunos = alunos.length;
  const totalFaltas = faltas.length;
  const hoje        = new Date().toISOString().split('T')[0];
  const faltasHoje  = faltas.filter((f) => f.data === hoje).length;

  const alunosComFreq = alunos.map((a) => {
    const freq = getFrequenciaAluno(a.id, a.turma);
    return { ...a, ...freq };
  });

  const reprovados = alunosComFreq.filter((a) => a.situacao.cor === 'reprovado').length;
  const emRisco    = alunosComFreq.filter((a) => a.situacao.cor === 'risco').length;
  const emAtencao  = alunosComFreq.filter((a) => a.situacao.cor === 'atencao').length;

  const ultimasFaltas = [...faltas]
    .sort((a, b) => b.data.localeCompare(a.data))
    .slice(0, 8)
    .map((f) => {
      const aluno = alunos.find((a) => a.id === f.alunoId);
      return { ...f, alunoNome: aluno.nome, alunoMatricula: aluno.matricula };
    });

  return { totalAlunos, totalFaltas, faltasHoje, reprovados, emRisco, emAtencao, ultimasFaltas };
}
