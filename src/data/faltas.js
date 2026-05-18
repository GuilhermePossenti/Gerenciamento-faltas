// Período de referência: 5 semanas de aula (1º bimestre)
// Total de aulas por disciplina: 4 aulas/sem → 20 | 2 aulas/sem → 10
//
// Situação calculada pela MENOR frequência entre todas as disciplinas:
//   < 75%       → Reprovado  (id:12 Lucas  — Math: 7/20 = 65%)
//   75% a <80%  → Risco      (id:8  Henrique — Math: 5/20 = 75%)
//   80% a <90%  → Atenção    (id:2 Bruno, id:4 Daniel, id:10 João — Math: 4/20 = 80%)
//   ≥ 90%       → Regular    (demais)

export const faltas = [
  // ── Lucas Freitas Ribeiro (id:12, turma:3B) ──────────────────────────
  // Math (151): 7 faltas / 20 aulas = 65% → REPROVADO
  { id:  1, alunoId: 12, turmaId: "3B", disciplinaId: 151, disciplinaNome: "Matemática", data: "2026-02-05", justificada: false, motivo: null },
  { id:  2, alunoId: 12, turmaId: "3B", disciplinaId: 151, disciplinaNome: "Matemática", data: "2026-02-12", justificada: false, motivo: null },
  { id:  3, alunoId: 12, turmaId: "3B", disciplinaId: 151, disciplinaNome: "Matemática", data: "2026-02-19", justificada: false, motivo: null },
  { id:  4, alunoId: 12, turmaId: "3B", disciplinaId: 151, disciplinaNome: "Matemática", data: "2026-02-26", justificada: false, motivo: null },
  { id:  5, alunoId: 12, turmaId: "3B", disciplinaId: 151, disciplinaNome: "Matemática", data: "2026-03-05", justificada: false, motivo: null },
  { id: 81, alunoId: 12, turmaId: "3B", disciplinaId: 151, disciplinaNome: "Matemática", data: "2026-03-19", justificada: false, motivo: null },
  { id: 15, alunoId: 12, turmaId: "3B", disciplinaId: 151, disciplinaNome: "Matemática", data: "2026-05-08", justificada: false, motivo: null },
  // Português (152): 4/20 = 80% → Atenção
  { id:  6, alunoId: 12, turmaId: "3B", disciplinaId: 152, disciplinaNome: "Português",  data: "2026-03-12", justificada: false, motivo: null },
  { id:  7, alunoId: 12, turmaId: "3B", disciplinaId: 152, disciplinaNome: "Português",  data: "2026-03-26", justificada: false, motivo: null },
  { id:  8, alunoId: 12, turmaId: "3B", disciplinaId: 152, disciplinaNome: "Português",  data: "2026-04-02", justificada: false, motivo: null },
  { id:  9, alunoId: 12, turmaId: "3B", disciplinaId: 152, disciplinaNome: "Português",  data: "2026-04-09", justificada: false, motivo: null },
  // Física (153): 3/10 = 70% → Reprovado
  { id: 10, alunoId: 12, turmaId: "3B", disciplinaId: 153, disciplinaNome: "Física",     data: "2026-04-16", justificada: false, motivo: null },
  { id: 11, alunoId: 12, turmaId: "3B", disciplinaId: 153, disciplinaNome: "Física",     data: "2026-04-23", justificada: false, motivo: null },
  { id: 12, alunoId: 12, turmaId: "3B", disciplinaId: 153, disciplinaNome: "Física",     data: "2026-04-30", justificada: false, motivo: null },
  // História (156): 2/10 = 80% → Atenção
  { id: 13, alunoId: 12, turmaId: "3B", disciplinaId: 156, disciplinaNome: "História",   data: "2026-04-30", justificada: true,  motivo: "Atestado médico" },
  { id: 14, alunoId: 12, turmaId: "3B", disciplinaId: 156, disciplinaNome: "História",   data: "2026-05-07", justificada: false, motivo: null },
  // Inglês (157): 1/10 = 90% → Regular
  { id: 16, alunoId: 12, turmaId: "3B", disciplinaId: 157, disciplinaNome: "Inglês",     data: "2026-05-14", justificada: false, motivo: null },

  // ── Henrique Barbosa Souza (id:8, turma:1A) ──────────────────────────
  // Math (101): 5/20 = 75% → RISCO
  { id: 17, alunoId: 8, turmaId: "1A", disciplinaId: 101, disciplinaNome: "Matemática", data: "2026-02-10", justificada: false, motivo: null },
  { id: 18, alunoId: 8, turmaId: "1A", disciplinaId: 101, disciplinaNome: "Matemática", data: "2026-02-17", justificada: false, motivo: null },
  { id: 19, alunoId: 8, turmaId: "1A", disciplinaId: 101, disciplinaNome: "Matemática", data: "2026-02-24", justificada: false, motivo: null },
  { id: 20, alunoId: 8, turmaId: "1A", disciplinaId: 101, disciplinaNome: "Matemática", data: "2026-03-03", justificada: false, motivo: null },
  { id: 29, alunoId: 8, turmaId: "1A", disciplinaId: 101, disciplinaNome: "Matemática", data: "2026-05-12", justificada: false, motivo: null },
  // Português (102): 3/20 = 85% → Atenção
  { id: 21, alunoId: 8, turmaId: "1A", disciplinaId: 102, disciplinaNome: "Português",  data: "2026-03-10", justificada: false, motivo: null },
  { id: 22, alunoId: 8, turmaId: "1A", disciplinaId: 102, disciplinaNome: "Português",  data: "2026-03-17", justificada: false, motivo: null },
  { id: 23, alunoId: 8, turmaId: "1A", disciplinaId: 102, disciplinaNome: "Português",  data: "2026-05-13", justificada: false, motivo: null },
  // História (104): 2/10 = 80% → Atenção  (registro 26 removido para manter Henrique em Risco)
  { id: 24, alunoId: 8, turmaId: "1A", disciplinaId: 104, disciplinaNome: "História",   data: "2026-04-07", justificada: true,  motivo: "Atestado médico" },
  { id: 25, alunoId: 8, turmaId: "1A", disciplinaId: 104, disciplinaNome: "História",   data: "2026-04-14", justificada: true,  motivo: "Atestado médico" },
  // Ed. Física (107): 2/10 = 80% → Atenção
  { id: 27, alunoId: 8, turmaId: "1A", disciplinaId: 107, disciplinaNome: "Ed. Física", data: "2026-04-28", justificada: false, motivo: null },
  { id: 28, alunoId: 8, turmaId: "1A", disciplinaId: 107, disciplinaNome: "Ed. Física", data: "2026-05-05", justificada: false, motivo: null },

  // ── Bruno Henrique Santos (id:2, turma:3A) ────────────────────────────
  // Math (141): 4/20 = 80% → ATENÇÃO
  { id: 31, alunoId: 2, turmaId: "3A", disciplinaId: 141, disciplinaNome: "Matemática", data: "2026-02-18", justificada: false, motivo: null },
  { id: 32, alunoId: 2, turmaId: "3A", disciplinaId: 141, disciplinaNome: "Matemática", data: "2026-03-04", justificada: false, motivo: null },
  { id: 33, alunoId: 2, turmaId: "3A", disciplinaId: 141, disciplinaNome: "Matemática", data: "2026-03-25", justificada: false, motivo: null },
  { id: 39, alunoId: 2, turmaId: "3A", disciplinaId: 141, disciplinaNome: "Matemática", data: "2026-05-13", justificada: false, motivo: null },
  // Física (143): 2/10 = 80% → Atenção  (registro 36 removido para manter Bruno em Atenção)
  { id: 34, alunoId: 2, turmaId: "3A", disciplinaId: 143, disciplinaNome: "Física",     data: "2026-04-01", justificada: false, motivo: null },
  { id: 35, alunoId: 2, turmaId: "3A", disciplinaId: 143, disciplinaNome: "Física",     data: "2026-04-08", justificada: false, motivo: null },
  // História (146): 2/10 = 80% → Atenção
  { id: 37, alunoId: 2, turmaId: "3A", disciplinaId: 146, disciplinaNome: "História",   data: "2026-04-22", justificada: true,  motivo: "Viagem de estudos" },
  { id: 38, alunoId: 2, turmaId: "3A", disciplinaId: 146, disciplinaNome: "História",   data: "2026-05-06", justificada: false, motivo: null },

  // ── Daniel Lima Costa (id:4, turma:2A) ───────────────────────────────
  // Math (121): 4/20 = 80% → ATENÇÃO
  { id: 40, alunoId: 4, turmaId: "2A", disciplinaId: 121, disciplinaNome: "Matemática", data: "2026-02-25", justificada: false, motivo: null },
  { id: 41, alunoId: 4, turmaId: "2A", disciplinaId: 121, disciplinaNome: "Matemática", data: "2026-03-11", justificada: false, motivo: null },
  { id: 42, alunoId: 4, turmaId: "2A", disciplinaId: 121, disciplinaNome: "Matemática", data: "2026-03-18", justificada: false, motivo: null },
  { id: 47, alunoId: 4, turmaId: "2A", disciplinaId: 121, disciplinaNome: "Matemática", data: "2026-05-13", justificada: false, motivo: null },
  // Português (122): 2/20 = 90% → Regular
  { id: 43, alunoId: 4, turmaId: "2A", disciplinaId: 122, disciplinaNome: "Português",  data: "2026-04-01", justificada: false, motivo: null },
  { id: 44, alunoId: 4, turmaId: "2A", disciplinaId: 122, disciplinaNome: "Português",  data: "2026-04-15", justificada: false, motivo: null },
  // Física (123): 1/10 = 90% → Regular
  { id: 45, alunoId: 4, turmaId: "2A", disciplinaId: 123, disciplinaNome: "Física",     data: "2026-04-29", justificada: true,  motivo: "Atestado médico" },

  // ── João Pedro Vieira Gomes (id:10, turma:1B) ────────────────────────
  // Math (111): 4/20 = 80% → ATENÇÃO
  { id: 48, alunoId: 10, turmaId: "1B", disciplinaId: 111, disciplinaNome: "Matemática", data: "2026-02-24", justificada: false, motivo: null },
  { id: 49, alunoId: 10, turmaId: "1B", disciplinaId: 111, disciplinaNome: "Matemática", data: "2026-03-17", justificada: false, motivo: null },
  { id: 50, alunoId: 10, turmaId: "1B", disciplinaId: 111, disciplinaNome: "Matemática", data: "2026-04-07", justificada: false, motivo: null },
  { id: 54, alunoId: 10, turmaId: "1B", disciplinaId: 111, disciplinaNome: "Matemática", data: "2026-05-13", justificada: false, motivo: null },
  // Português (112): 2/20 = 90% → Regular
  { id: 51, alunoId: 10, turmaId: "1B", disciplinaId: 112, disciplinaNome: "Português",  data: "2026-04-21", justificada: false, motivo: null },
  { id: 52, alunoId: 10, turmaId: "1B", disciplinaId: 112, disciplinaNome: "Português",  data: "2026-05-05", justificada: false, motivo: null },
  // História (114): 1/10 = 90% → Regular
  { id: 53, alunoId: 10, turmaId: "1B", disciplinaId: 114, disciplinaNome: "História",   data: "2026-05-06", justificada: true,  motivo: "Atestado médico" },

  // ── Demais alunos — frequência ≥ 90% → REGULAR ───────────────────────
  { id: 55, alunoId: 1,  turmaId: "3A", disciplinaId: 141, disciplinaNome: "Matemática", data: "2026-03-10", justificada: false, motivo: null },
  { id: 56, alunoId: 1,  turmaId: "3A", disciplinaId: 142, disciplinaNome: "Português",  data: "2026-04-14", justificada: false, motivo: null },
  { id: 57, alunoId: 1,  turmaId: "3A", disciplinaId: 147, disciplinaNome: "Inglês",     data: "2026-05-05", justificada: false, motivo: null },
  { id: 58, alunoId: 3,  turmaId: "3B", disciplinaId: 151, disciplinaNome: "Matemática", data: "2026-03-10", justificada: false, motivo: null },
  { id: 59, alunoId: 3,  turmaId: "3B", disciplinaId: 151, disciplinaNome: "Matemática", data: "2026-04-07", justificada: false, motivo: null },
  { id: 60, alunoId: 3,  turmaId: "3B", disciplinaId: 152, disciplinaNome: "Português",  data: "2026-04-21", justificada: false, motivo: null },
  { id: 61, alunoId: 3,  turmaId: "3B", disciplinaId: 153, disciplinaNome: "Física",     data: "2026-05-05", justificada: false, motivo: null },
  { id: 62, alunoId: 5,  turmaId: "2A", disciplinaId: 121, disciplinaNome: "Matemática", data: "2026-03-24", justificada: false, motivo: null },
  { id: 63, alunoId: 5,  turmaId: "2A", disciplinaId: 122, disciplinaNome: "Português",  data: "2026-04-28", justificada: false, motivo: null },
  { id: 64, alunoId: 6,  turmaId: "2B", disciplinaId: 131, disciplinaNome: "Matemática", data: "2026-04-07", justificada: false, motivo: null },
  { id: 65, alunoId: 6,  turmaId: "2B", disciplinaId: 131, disciplinaNome: "Matemática", data: "2026-04-14", justificada: false, motivo: null },
  { id: 66, alunoId: 6,  turmaId: "2B", disciplinaId: 132, disciplinaNome: "Português",  data: "2026-05-12", justificada: false, motivo: null },
  { id: 67, alunoId: 7,  turmaId: "2B", disciplinaId: 134, disciplinaNome: "Biologia",   data: "2026-04-22", justificada: false, motivo: null },
  { id: 68, alunoId: 7,  turmaId: "2B", disciplinaId: 136, disciplinaNome: "História",   data: "2026-05-12", justificada: false, motivo: null },
  { id: 69, alunoId: 9,  turmaId: "1A", disciplinaId: 102, disciplinaNome: "Português",  data: "2026-04-14", justificada: false, motivo: null },
  { id: 70, alunoId: 9,  turmaId: "1A", disciplinaId: 103, disciplinaNome: "Ciências",   data: "2026-05-05", justificada: false, motivo: null },
  { id: 71, alunoId: 11, turmaId: "3A", disciplinaId: 143, disciplinaNome: "Física",     data: "2026-03-24", justificada: false, motivo: null },
  { id: 72, alunoId: 13, turmaId: "2A", disciplinaId: 121, disciplinaNome: "Matemática", data: "2026-04-28", justificada: false, motivo: null },
  { id: 73, alunoId: 15, turmaId: "2B", disciplinaId: 131, disciplinaNome: "Matemática", data: "2026-04-21", justificada: false, motivo: null },
  { id: 74, alunoId: 15, turmaId: "2B", disciplinaId: 133, disciplinaNome: "Física",     data: "2026-05-05", justificada: false, motivo: null },
  { id: 75, alunoId: 16, turmaId: "3B", disciplinaId: 151, disciplinaNome: "Matemática", data: "2026-05-05", justificada: false, motivo: null },
  { id: 76, alunoId: 17, turmaId: "1A", disciplinaId: 101, disciplinaNome: "Matemática", data: "2026-03-17", justificada: false, motivo: null },
  { id: 77, alunoId: 19, turmaId: "3A", disciplinaId: 142, disciplinaNome: "Português",  data: "2026-04-07", justificada: false, motivo: null },
  { id: 78, alunoId: 19, turmaId: "3A", disciplinaId: 147, disciplinaNome: "Inglês",     data: "2026-05-12", justificada: false, motivo: null },
  { id: 79, alunoId: 14, turmaId: "1B", disciplinaId: 111, disciplinaNome: "Matemática", data: "2026-04-14", justificada: false, motivo: null },
  { id: 80, alunoId: 20, turmaId: "2A", disciplinaId: 122, disciplinaNome: "Português",  data: "2026-03-31", justificada: false, motivo: null },
];
