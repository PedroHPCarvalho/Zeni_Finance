# 💰 Zeni Finance

### Sistema Inteligente de Gestão Financeira Pessoal em Produção

<div align="center">

**Uma plataforma completa para controlar seus gastos, investimentos e análises financeiras com IA integrada.**

</div>

---

<div align="center">

[![Status](https://img.shields.io/badge/Status-Em%20Produ%C3%A7%C3%A3o-success?style=for-the-badge)]()
[![Java](https://img.shields.io/badge/Java-17-ED8936?style=flat-square)]()
[![Spring Boot](https://img.shields.io/badge/SpringBoot-3.5.4-6DB33F?style=flat-square)]()
[![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=flat-square)]()
[![Python](https://img.shields.io/badge/Python-3.x-3776ab?style=flat-square)]()
[![Django](https://img.shields.io/badge/Django-5.2.6-092E20?style=flat-square)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-336791?style=flat-square)]()
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=flat-square)]()
[![Azure](https://img.shields.io/badge/Azure-Cloud-0078D4?style=flat-square)]()

[![Site](https://img.shields.io/badge/Site-zenifinance.com.br-0ea5e9?style=for-the-badge)](https://zenifinance.com.br/)

[📖 Documentação](#documentação) • [🏗️ Arquitetura](#-arquitetura) • [📦 Stack](#-stack-tecnológico) • [✨ Recursos](#-principais-recursos) • [🤝 Contribuir](#-contribuição)

</div>

---

---

## 📋 Visão Geral

O **Zeni Finance** é uma aplicação web sofisticada de gestão de finanças pessoais, **em produção**, que permite que usuários registrem, categorizem e analisem suas transações financeiras com recursos avançados de visualização, relatórios e recomendações inteligentes impulsionadas por IA.

### ✨ Principais Funcionalidades

- 👤 **Autenticação Segura** - Login com JWT e Spring Security
- 💳 **Gestão de Transações** - Registre receitas, despesas e investimentos de forma intuitiva
- 📊 **Dashboards Inteligentes** - Visualizações em tempo real com gráficos interativos
- 📈 **Análises Detalhadas** - Resumos por categoria, período e tipo de transação
- 🤖 **Assistente IA Contextualizado** - Recomendações inteligentes via ZeniAITools (Azure OpenAI)
- 🔗 **Automação com N8N** - Sincronização e workflows automáticos
- 📱 **Interface Responsiva** - Design moderno e acessível
- ⚡ **Performance Otimizada** - Carregamentos rápidos e operações em tempo real

---

## 🏗️ Arquitetura

O projeto segue uma **arquitetura em camadas** com separação clara de responsabilidades:

Camada de Apresentação

```
┌─────────────────────────────────────────────────────────────┐
│                   CAMADA DE APRESENTAÇÃO                    │
│                                                             │
│  FRONTEND - React SPA                                        │
│  ├─ Hospedado em Hostinger (conteúdo estático/edge)         │
│  ├─ SPA responsiva e otimizada para produção                 │
│  └─ Componentes e hooks reutilizáveis                       │
│                                                             │
│  AGENTE WHATSAPP - n8n                                       │
│  ├─ Orquestra fluxos de mensagens e automações              │
│  ├─ Integração via webhooks com o BFF/Core                   │
│  └─ Fornece suporte conversacional e ações automatizadas     │
│                                                             │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP REST (JSON) / Webhooks
┌──────────────────────────▼───────────────────────────────────────┐
│                   CAMADA DE INTERMEDIAÇÃO                        │
│                                                                  │
│  BFF - Backend for Frontend (Django 5.2.6)                      │
│  ├─ Adaptação de Contratos REST                                │
│  ├─ Agregação e Transformação de Dados                         │
│  ├─ CORS Configuration                                         │
│  ├─ Django REST Framework                                      │
│  └─ Comunicação com Core                                       │
│                                                                  │
└──────────────────────────┬───────────────────────────────────────┘
                           │ HTTP REST (JSON)
┌──────────────────────────▼───────────────────────────────────────┐
│                    CAMADA DE NEGÓCIO                             │
│                                                                  │
│  CORE API REST (Java 17 + Spring Boot 3.5.4)                    │
│  ├─ Controllers (Endpoints HTTP)                               │
│  ├─ Services (Lógica de Negócio)                               │
│  ├─ Repositories (JPA/Hibernate)                               │
│  ├─ Security (JWT + Spring Security)                           │
│  ├─ ZeniAITools (Integração IA Azure OpenAI)                   │
│  └─ Mappers (DTO Conversion)                                   │
│                                                                  │
└──────────────────────────┬───────────────────────────────────────┘
                           │ JDBC/SQL
┌──────────────────────────▼───────────────────────────────────────┐
│                    CAMADA DE PERSISTÊNCIA                        │
│                                                                  │
│  PostgreSQL 17                                                  │
│  ├─ Tabela: users                                              │
│  ├─ Tabela: financial_registers                                │
│  └─ Migrations (Flyway)                                        │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Princípios Arquiteturais

| Princípio | Benefício |
|-----------|-----------|
| **Separação de Responsabilidades** | Cada camada com seu domínio específico |
| **Baixo Acoplamento** | Camadas se comunicam via contratos (DTOs) |
| **Alta Coesão** | Funcionalidades relacionadas agrupadas |
| **DRY (Don't Repeat Yourself)** | Componentes e lógica reutilizáveis |
| **SOLID Principles** | Arquitetura escalável e mantível |
| **Clean Code** | Código legível e bem documentado |

---

## 📦 Stack Tecnológico

### Frontend (front_web/)

```
┌────────────────────────────────────────────────┐
│  React 19.1.1 + Vite 7.1.12                   │
├────────────────────────────────────────────────┤
│  • React Router DOM 7.9.4 (Routing)            │
│  • Axios 1.6.2 (HTTP Client)                   │
│  • Recharts 3.3.0 (Gráficos Interativos)      │
│  • CSS Modules (Styling)                      │
│  • Boxicons + Lucide React (Ícones)           │
│  • ESLint 9.36.0 (Linting)                    │
│  • Vite 7.1.12 (Build Tool)                   │
└────────────────────────────────────────────────┘
```

**Estrutura de Pastas:**
```
front_web/
├── src/
│   ├── components/      # Componentes reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   ├── hooks/          # Custom hooks
│   ├── styles/         # CSS Modules
│   ├── utils/          # Funções utilitárias
│   ├── layouts/        # Layouts base
│   ├── App.jsx         # Componente raiz
│   └── main.jsx        # Entry point
├── config/
│   └── api.js          # Configuração de API
├── public/             # Assets estáticos
└── index.html          # HTML base
```

### BFF - Backend for Frontend (bff-django-web/)

```
┌────────────────────────────────────────────────┐
│  Python 3.x + Django 5.2.6                    │
├────────────────────────────────────────────────┤
│  • Django REST Framework 3.16.1                │
│  • django-cors-headers 4.8.0 (CORS)           │
│  • Requests 2.32.5 (HTTP Client)              │
│  • Black 25.1.0 (Code Formatter)              │
│  • MyPy 1.1.0 (Type Checking)                 │
│  • isort 6.0.1 (Import Sorting)               │
└────────────────────────────────────────────────┘
```

**Estrutura de Pastas:**
```
bff-django-web/
├── bff/                # App Django principal
│   ├── models.py       # Modelos de dados
│   ├── serializers.py  # Serializers DRF
│   ├── views.py        # Views/Endpoints
│   ├── urls.py         # Rotas
│   ├── admin.py        # Admin Django
│   └── migrations/     # Database migrations
├── bff_django/         # Configurações Django
│   ├── settings.py     # Variáveis e apps
│   ├── urls.py         # Rotas globais
│   ├── asgi.py         # ASGI config
│   └── wsgi.py         # WSGI config
├── manage.py           # CLI Django
└── requirements.txt    # Dependências
```

### Core - Backend Principal (core/)

```
┌────────────────────────────────────────────────┐
│  Java 17 + Spring Boot 3.5.4                  │
├────────────────────────────────────────────────┤
│  • Spring Web (REST)                          │
│  • Spring Data JPA (ORM)                      │
│  • Spring Security (Autenticação)             │
│  • PostgreSQL Driver 42.5.4                   │
│  • Lombok (Redução de Boilerplate)            │
│  • ModelMapper (DTO Mapping)                  │
│  • Flyway (Database Migrations)               │
│  • SpringDoc OpenAPI (Swagger/OpenAPI)        │
│  • JUnit 5 + Mockito (Testing)                │
└────────────────────────────────────────────────┘
```

**Estrutura de Pacotes:**
```
core/src/main/java/com/zenifinance/core/
├── CoreApplication.java         # Entry point
├── config/
│   ├── MapperConfig.java        # Configuração ModelMapper
│   └── SecurityConfig.java      # Segurança JWT
├── controller/
│   ├── AuthenticationController.java
│   ├── FinancialRegistersController.java
│   └── UserDataController.java
├── service/                     # Lógica de negócio
├── repository/                  # Acesso a dados (JPA)
├── entity/                      # Modelos JPA
│   ├── User.java
│   └── FinancialRegisters.java
├── dto/                         # Data Transfer Objects
├── exception/                   # Exceções customizadas
├── mapper/                      # Mapeadores DTO
└── util/                        # Classes utilitárias
```


### External Services

- **Azure OpenAI (via ZeniAITools)** - Assistente IA contextualizado para análise financeira
- **N8N** - Automação e workflows de sincronização
- **PostgreSQL** - Database relacional de alta performance

---

## 🚀 Ambiente de Produção

O projeto está **totalmente em produção** e deployado na plataforma **Azure Container Apps**. Todos os serviços estão containerizados e orquestrados via Docker Compose.

### Acesso aos Serviços

| Serviço | Descrição |
|---------|-----------|
| Frontend | Interface web React responsiva |
| Core API | API REST com lógica de negócio |
| BFF | Intermediação entre Frontend e Core |
| Database | PostgreSQL gerenciado |

### Deploy Contínuo

O projeto utiliza **Docker** para containerização com:
- Versionamento automático
- Health checks
- Auto-scaling baseado em recursos
- Logging centralizado
- Monitoramento de performance

---

## 📖 Documentação

### Documentação do Projeto

| Documento | Descrição |
|-----------|-----------|
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Detalhes da arquitetura e decisões |
| [CONTRIBUTING.md](./docs/CONTRIBUTING.md) | Guia de contribuição e workflow Git |

### Documentação Técnica por Módulo

- **Frontend**: [front_web/README.md](./front_web/README.md)
- **BFF**: [bff-django-web/README.md](./bff-django-web/README.md)
- **Core**: [core/pom.xml](./core/pom.xml)

### Documentação de API

- **Swagger/OpenAPI**: http://localhost:8080/swagger-ui.html (quando Core está rodando)

---

## 🔑 Principais Recursos

### 1. Autenticação e Segurança

- **JWT (JSON Web Tokens)** para autenticação
- **Spring Security** para autorização
- **CORS** configurado no BFF
- **Senhas** hasheadas com algoritmos seguros

```java
// Exemplo: Requisição autenticada
POST /api/users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. CRUD Completo de Transações

```
GET    /api/financial-registers       # Listar transações
POST   /api/financial-registers       # Criar transação
GET    /api/financial-registers/{id}  # Obter transação
PUT    /api/financial-registers/{id}  # Atualizar transação
DELETE /api/financial-registers/{id}  # Deletar transação
```

### 3. Endpoints de Resumos e Análises

```
GET /api/resume/cards                 # Resumo geral (saldo, entradas, saídas)
GET /api/resume/category              # Resumo por categoria
GET /api/resume/month                 # Resumo mensal
GET /api/resume/investment            # Resumo de investimentos
```

### 4. Dashboard Interativo

- Gráficos em tempo real com Recharts
- Filtros por período
- Visualização de categorias
- Relatórios customizáveis

### 5. Assistente IA Contextualizado (ZeniAITools)

O **ZeniAITools** é um módulo especializado que integra Azure OpenAI com contexto financeiro:

- 🤖 **Análise Inteligente** - Interpreta padrões de gastos e receitas
- 💡 **Recomendações Personalizadas** - Sugestões baseadas no histórico do usuário
- ⚠️ **Alertas Automáticos** - Detecta comportamentos anormais ou gastos excessivos
- 📊 **Insights Financeiros** - Análise textual de transações e categorias
- 🎯 **Otimização de Orçamento** - Recomendações para melhorar saúde financeira




## 🔄 Fluxo de Dados

```
┌──────────────────────────────┐
│  User (Navegador)            │
│  └─ Interface React          │
└────────────────┬─────────────┘
                 │ HTTP/JWT
┌────────────────▼─────────────────────────────┐
│  FRONTEND (React Components)                 │
│  ├─ Axios com interceptor JWT                │
│  ├─ Custom Hooks para state management       │
│  └─ Cache em localStorage                    │
└────────────────┬─────────────────────────────┘
                 │ HTTP REST (JSON)
┌────────────────▼──────────────────────────────┐
│  BFF (Django REST Framework)                 │
│  ├─ Validação CORS                           │
│  ├─ Transformação de contratos               │
│  ├─ Agregação de dados                       │
│  └─ Chamadas para Core                       │
└────────────────┬──────────────────────────────┘
                 │ HTTP REST (JSON)
┌────────────────▼──────────────────────────────┐
│  CORE API (Spring Boot)                      │
│  ├─ Validação JWT                            │
│  ├─ Business Logic (Services)                │
│  ├─ Persistência (JPA/Repositories)          │
│  └─ Integração ZeniAITools                   │
└────────────────┬──────────────────────────────┘
                 │ JDBC/SQL
┌────────────────▼──────────────────────────────┐
│  PostgreSQL Database                         │
│  ├─ Dados de usuários                        │
│  ├─ Registros financeiros                    │
│  └─ Índices otimizados                       │
└───────────────────────────────────────────────┘
```

---

## 🔍 Componentes Principais do Frontend

### Custom Hooks

| Hook | Descrição |
|------|-----------|
| `useLogin()` | Gerencia autenticação |
| `useCards()` | Busca dados de resumos |
| `useInvestments()` | Gerencia dados de investimentos |
| `useCategory()` | Operações com categorias |
| `useRegister()` | CRUD de transações |
| `useMonthResume()` | Resumo mensal |
| `usePaginatedFetch()` | Paginação de dados |
| `useRequireAuth()` | Proteção de rotas |

### Componentes Reutilizáveis

| Componente | Propósito |
|------------|-----------|
| `ContentCard` | Card base para conteúdo |
| `ValueCard` | Exibição de valores |
| `TableCard` | Tabelas de dados |
| `HistoryTableCard` | Histórico de transações |
| `ChatRegisterCard` | Registro via chat |
| `ManualRegisterCard` | Registro manual |
| `FilterCard` | Filtros de dados |
| `ReceitaDespesasBarChart` | Gráfico receitas vs despesas |
| `CategoryPieChart` | Gráfico de categorias |
| `TopCategoryCard` | Top categorias de gasto |
| `GamblingAlertCard` | Alertas especiais |
| `InvesimentosLineChart` | Gráfico investimentos |

## 🚢 Infraestrutura e Deploy

### Arquitetura de Produção

O Zeni Finance está em produção robusta utilizando:

```
┌─────────────────────────────────────────────────────────┐
│             Azure Container Apps                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Frontend Container (React + Nginx)              │  │
│  │  └─ Servindo aplicação estática otimizada       │  │
│  ├──────────────────────────────────────────────────┤  │
│  │  BFF Container (Django)                         │  │
│  │  └─ Intermediação entre Frontend e Core        │  │
│  ├──────────────────────────────────────────────────┤  │
│  │  Core Container (Spring Boot)                   │  │
│  │  ├─ API REST com lógica de negócio            │  │
│  │  └─ Integração ZeniAITools (Azure OpenAI)     │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  Dependencies:                                          │
│  ├─ Azure Database PostgreSQL (17)                 │  │
│  ├─ Azure OpenAI (Modelos GPT)                    │  │
│  ├─ Azure Container Registry                       │  │
│  └─ Application Insights (Monitoring)              │  │
└─────────────────────────────────────────────────────────┘
```

### Docker & Containerização

Todos os serviços estão containerizados com:

**Dockerfile Multi-stage (Exemplo):**
```dockerfile
# Build stage
FROM maven:3.8.1-jdk-17 as builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:17-slim
COPY --from=builder /app/target/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
```

**Docker Compose Orquestração (Exemplo):**
```yaml
version: '3.8'
services:
  db:
    image: postgres:17
    volumes:
      - db_data:/var/lib/postgresql/data
  
  core:
    build: ./core
    depends_on: [db]
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/zeni
      - AZURE_OPENAI_KEY=${AZURE_OPENAI_KEY}
  
  bff:
    build: ./bff-django-web
    depends_on: [core]
  
  frontend:
    build: ./front_web
    ports:
      - "80:80"
```

### Monitoramento e Observabilidade

- **Container Logs** - Logs centralizados no Azure
- **Health Checks** - Validação contínua da disponibilidade
- **Auto-scaling** - Escalabilidade baseada em CPU/memória
- **Alerting** - Notificações de anomalias
--- 

## 📝 Histórico de Desenvolvimento

### v1.0.0 - Release em Produção ✅

#### Backend Core
- ✅ Arquitetura REST completa
- ✅ Autenticação JWT segura
- ✅ CRUD de usuários e transações
- ✅ Endpoints de análise e resumos
- ✅ Integração ZeniAITools (Azure OpenAI)
- ✅ Migrations com Flyway
- ✅ Documentação Swagger/OpenAPI

#### BFF (Backend for Frontend)
- ✅ Camada de intermediação
- ✅ CORS configuration
- ✅ Agregação de dados
- ✅ Transformação de contratos
- ✅ Django REST Framework

#### Frontend
- ✅ Interface React moderna
- ✅ Custom hooks reutilizáveis
- ✅ 12+ componentes de negócio
- ✅ Dashboards com Recharts
- ✅ Responsividade CSS Modules
- ✅ Autenticação e autorização
- ✅ Refatoração completa (Performance + Qualidade)

#### DevOps & Infraestrutura
- ✅ Dockerização de todos os serviços
- ✅ Docker Compose multi-container
- ✅ Deploy em Azure Container Apps
- ✅ PostgreSQL gerenciado
- ✅ Monitoring e alerting

### Roadmap Futuro

- 🔄 Testes e2e com Cypress
- 🔄 CI/CD Pipeline (GitHub Actions)
- 🔄 Análise de despesas com ML
- 🔄 Sincronização com N8N automática
- 🔄 Relatórios em PDF/Excel exportáveis
- 🔄 Mobile app (React Native)

---

## 🐛 Suporte e Issues

Encontrou um bug ou tem uma sugestão? 

**[Abra uma issue](https://github.com/PedroHPCarvalho/Zeni_Finance/issues)** incluindo:
- ✅ Título claro e descritivo
- ✅ Passos detalhados para reproduzir
- ✅ Comportamento esperado vs. atual
- ✅ Screenshots/logs/stack trace (se aplicável)
- ✅ Informações do ambiente (navegador, OS, versão)

---

## 📚 Recursos Adicionais

| Recurso | Link |
|---------|------|
| Documentação Técnica | [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) |
| Guia de Contribuição | [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) |
| Issues & Roadmap | [GitHub Issues](https://github.com/PedroHPCarvalho/Zeni_Finance/issues) |
| Swagger/OpenAPI | http://localhost:8080/swagger-ui.html |

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Você é livre para usar, modificar e distribuir sob os termos desta licença.

Veja [LICENSE](./LICENSE) para detalhes completos.

---

## 👤 Sobre o Autor

**Pedro HP Carvalho**

Desenvolvedor Back-end apaixonado por desenvolver de soluções inovadoras e gerar valor.

- 🌐 **GitHub:** [@PedroHPCarvalho](https://github.com/PedroHPCarvalho)
- 💼 **LinkedIn:** [Pedro Henrique Carvalho](https://www.linkedin.com/in/pedro-henrique-carvalho-71b334208/)
- 📧 **Email:** [pedroh.fokus@gmail.com]

---


## 📊 Estatísticas do Projeto

```
📦 Componentes:       15+ componentes React reutilizáveis
🔧 API Endpoints:    20+ endpoints REST
📊 Database Tables:   2 tabelas principais normalizadas
⚡ Performance:      Resposta média < 300ms
🔒 Security:         JWT + Spring Security + CORS
📱 Dispositivos:     Responsivo em todos os tamanhos
```

---

## 🔐 Segurança

O Zeni Finance foi desenvolvido com foco em segurança:

✅ **Autenticação**
- JWT tokens com expiração configurável
- Senhas hashadas com bcrypt
- Refresh token rotation

✅ **Autorização**
- Spring Security com role-based access
- User isolation de dados
- CORS policy restritivo

✅ **Dados**
- Criptografia em trânsito (HTTPS)
- SQL injection prevention (JPA Parameterized)
- XSS protection (React escaping)

✅ **Infraestrutura**
- Container isolation
- Network policies
- Audit logging
- Regular security updates

---

## 🎯 Visão Futura

O Zeni Finance está em constante evolução com planos para:

- **Intelligence** - ML para previsão de gastos e economia
- **Integrations** - Sincronização com bancos via open banking
- **Mobile** - App mobile nativo (iOS/Android)
- **Automation** - N8N workflows avançados
- **Reports** - Geração de relatórios em PDF/Excel
- **Analytics** - Business intelligence dashboards

---

<div align="center">

### 🌟 **Zeni Finance - Sua Inteligência Financeira**

**Desenvolvido com ❤️ em React, Python e Java**

[⭐ Dê uma estrela!](https://github.com/PedroHPCarvalho/Zeni_Finance) • [🔗 Compartilhe](https://twitter.com/share?text=Confira+o+Zeni+Finance&url=https://github.com/PedroHPCarvalho/Zeni_Finance) • [🚀 Contribua!](https://github.com/PedroHPCarvalho/Zeni_Finance/pulls)

---

**Última atualização:** Dezembro 2024 | **Status:** Em Produção ✅

</div>
