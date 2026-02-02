

##  Tecnologias Utilizadas

- **Next.js** - Framework React para desenvolvimento web
- **React** - Biblioteca para construção de interfaces
- **Axios** - Cliente HTTP para comunicação com a API
- **CSS** - Estilização dos componentes

---

##  Estrutura do Projeto

```
src/
├── app/                        # Páginas da aplicação (rotas)
│   ├── page.js                 # Página Home
│   ├── Home.css                # Estilo da Home
│   ├── Auth.css                # Estilos compartilhados de autenticação
│   ├── layout.js               # Layout global com AuthProvider
│   ├── globals.css             # Estilos globais
│   ├── login/
│   │   └── page.js             # Página de Login
│   ├── signup/
│   │   └── page.js             # Página de Cadastro
│   └── dashboard/
│       ├── page.js             # Página Dashboard (protegida)
│       └── Dashboard.css       # Estilo do Dashboard
├── components/
│   ├── ui/                     # Componentes de interface reutilizáveis
│   │   ├── Button.js           # Componente de botão
│   │   ├── Button.css
│   │   ├── Input.js            # Componente de campo de entrada
│   │   ├── Input.css
│   │   ├── Loading.js          # Componente de carregamento
│   │   └── Loading.css
│   └── auth/                   # Componentes de autenticação
│       ├── SignupForm.js       # Formulário de cadastro
│       ├── SignupForm.css
│       ├── LoginForm.js        # Formulário de login
│       └── LoginForm.css
├── services/                   # Comunicação com a API
│   ├── api.js                  # Instância do axios configurada
│   └── authService.js          # Funções de chamada aos endpoints
└── context/                    # Estado global
    └── AuthContext.js           # Context de autenticação
```
