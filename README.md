# SisFreq — Sistema de Frequência Escolar

Sistema web para gerenciamento de faltas e controle de frequência de alunos, desenvolvido para o **Instituto Federal Catarinense - Campus Videira**.

---

## Sobre o Projeto

O SisFreq permite que diretores, secretaria e administradores acompanhem em tempo real a frequência dos alunos por disciplina, identifiquem alunos em risco de reprovação e consultem o histórico de faltas. A autenticação é local, com usuários pré-cadastrados e sessão persistida via `localStorage`.

---

## Heurísticas de Nielsen Aplicadas

O projeto foi desenvolvido seguindo as **10 Heurísticas de Usabilidade de Jakob Nielsen**. As principais aplicadas:

| # | Heurística | Onde é aplicada |
|---|---|---|
| **H1** | Visibilidade do status do sistema | Botão "Entrar" exibe spinner e texto "Entrando…" durante o carregamento |
| **H2** | Correspondência com o mundo real | Terminologia familiar: "Diretor", "Secretaria", "Matrícula", "Bimestre" |
| **H3** | Controle e liberdade do usuário | Redireciona automaticamente para o dashboard se já autenticado; redireciona para login se a sessão expirar |
| **H5** | Prevenção de erros | Validação dos campos antes do envio; campos desabilitados durante requisição |
| **H6** | Reconhecimento em vez de memorização | Legenda de situações de frequência sempre visível no dashboard |
| **H8** | Estética e design minimalista | Layout limpo com sidebar, área de conteúdo e foco nas informações essenciais |
| **H9** | Ajuda no reconhecimento e recuperação de erros | Mensagens de erro descritivas e orientadas à ação (ex.: "Login ou senha incorretos. Verifique os dados e tente novamente.") |
| **H10** | Ajuda e documentação | Credenciais de demonstração acessíveis diretamente na tela de login |

---

## Normas da Plataforma

O sistema segue as regras de frequência estabelecidas pela **Lei de Diretrizes e Bases da Educação Nacional (LDB - Lei nº 9.394/96)**:

| Situação | Frequência | Ação |
|---|---|---|
| **Regular** | ≥ 90% | Frequência adequada |
| **Atenção** | 80% – 89% | Monitorar frequência |
| **Risco** | 75% – 79% | Acompanhamento urgente |
| **Reprovado** | < 75% | Reprovado por falta |

> A frequência mínima exigida para aprovação é de **75%** por disciplina. A situação geral do aluno é determinada pela disciplina com o pior índice de frequência.

---

## Funcionalidades

- **Login** — Autenticação por login e senha com sessão persistida
- **Dashboard** — Painel com totais de alunos, reprovados, alunos em risco/atenção e últimas faltas registradas
- **Alunos** — Lista de todos os alunos com frequência geral e situação
- **Faltas** — Consulta e filtro de faltas por nome, matrícula, turma, disciplina, período e justificativa
- **Relatórios** — Alunos reprovados e em risco agrupados por turma

---

## Estrutura do Projeto

```
src/
├── app/
│   ├── (app)/              # Rotas protegidas (autenticação obrigatória)
│   │   ├── layout.js       # Layout com Sidebar e Header
│   │   ├── dashboard/      # Painel de controle
│   │   ├── alunos/         # Lista de alunos
│   │   ├── faltas/         # Consulta de faltas
│   │   └── relatorios/     # Relatórios de frequência
│   ├── page.js             # Página de login (rota pública)
│   └── globals.css         # Estilos globais e design system
├── componentes/
│   ├── auth/               # (legado) Formulários de login e cadastro
│   ├── layout/             # Sidebar e Header da aplicação
│   └── ui/                 # Componentes reutilizáveis (Button, Input, Loading)
├── context/
│   └── AuthContext.js      # Contexto de autenticação e gerenciamento de sessão
├── data/
│   ├── alunos.js           # Dados mockados de alunos
│   ├── turmas.js           # Dados mockados de turmas e disciplinas
│   └── faltas.js           # Dados mockados de faltas
└── services/
    └── dataService.js      # Lógica de cálculo de frequência e consultas
```

---

## Tecnologias

- **Next.js 15** — Framework React com App Router
- **React 19** — Biblioteca de interface
- **Axios** — Cliente HTTP
- **CSS Modular** — Estilização com escopo por componente
- **localStorage** — Persistência de sessão no navegador

---

## Instalação e Execução

```bash
git clone https://github.com/GuilhermePossenti/Gerenciamento-de-Faltas.git
cd Gerenciamento-de-Faltas
npm install
npm run dev
```

Acesse: `http://localhost:3000`

---

## Credenciais de Demonstração

| Login | Senha | Perfil |
|---|---|---|
| `diretor` | `escola123` | Diretor |
| `secretaria` | `escola123` | Secretaria |
| `admin` | `admin123` | Administrador |

---

## Fluxo de Navegação

```
/ (Login)
  └── /dashboard     → Painel com estatísticas gerais
       ├── /alunos   → Lista completa de alunos e frequência
       ├── /faltas   → Consulta de faltas com filtros
       └── /relatorios → Alunos reprovados e em risco
```

Rotas protegidas redirecionam automaticamente para o login caso a sessão não esteja ativa.
