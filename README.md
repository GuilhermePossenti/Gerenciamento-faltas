# Autenticação 


### Instalação
```bash
git clone https://github.com/GuilhermePossenti/Projeto-Fluxo-de-Autentica-o.git
cd Projeto-Fluxo-de-Autentica-o
npm install
npm run dev
```

Acesse: `http://localhost:3000`

##  Testar

### Credenciais
- **CPF**: 08068329919
- **Email**: gui.possenti789@gmail.com
- **Telefone**: 49999306867
- **Senha**: 123456

### Fluxo
1. Home → "Cadastrar-se" → Preencher formulário → "Cadastrar"
2. Login → Inserir CPF → "Continuar" → Inserir senha → "Entrar"


## ✅ Implementado

**Fase 1 - Singup**
- ✅ Check Email
- ✅ Check Phone
- ✅ Signup

**Fase 2 - Login**
- ✅ Pre-Singin
- ✅ Singin


##  Estrutura

```
src/
├── app/               # Páginas Next.js
├── componentes/       # Componentes React
├── services/          # API (authService, axios)
└── context/           # AuthContext
```

##  Ferramentas

- Next.js 14
- React 18
- Axios
- JWT
- CSS Modular

## 📋 API

Base: `https://apiinterview.threepixels.com.br/api/v1`

- `POST /authenticate/check/email` - Validar email
- `POST /authenticate/check/phone` - Validar telefone
- `POST /authenticate/singup` - Registrar
- `POST /authenticate/pre/singin` - Verificar CPF
- `POST /authenticate/singin` - Fazer login
- `POST /authenticate/check` - Validar token
- `POST /authenticate/refresh` - Renovar token
- `POST /authenticate/singout` - Logout
