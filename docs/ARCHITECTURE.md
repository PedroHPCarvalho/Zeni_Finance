# Arquitetura do Projeto Zeni Finance

## Visão Geral da Arquitetura

O projeto **Zeni Finance** foi estruturado utilizando uma arquitetura modular e separação por responsabilidades, buscando escalabilidade, manutenção facilitada e organização clara entre os domínios da aplicação.

Ele é composto por três camadas principais:

1. **Frontend (web-front) + Backend For Frontend (bff-back)**: Aplicacao web com uso do framework django + React, onde o frontend é responsável pela interface do usuário e o BFF atua como uma camada intermediária para adaptar as APIs do core às necessidades do frontend.
2. **Core (core-back)**: Contém as regras de negócio da aplicação, estruturado como uma API REST em Java com Spring Boot.

Essa arquitetura promove baixo acoplamento e alta coesão entre as partes, facilitando evolução e testes de forma isolada.

---

## Organização dos Repositórios e Pastas

A estrutura dos diretórios segue a seguinte hierarquia:

```
Zeni_Finance/
├── web-front/       # Projeto Django + React (Frontend + BFF) 
└── core-back/       # Projeto Java Spring Boot (Core)
```

Cada um desses projetos é independente e possui sua própria configuração e ciclo de build. Isso permite o desenvolvimento desacoplado de funcionalidades.

### Estrutura Interna do core-back 

```
core-back/
├── src/
│   ├── main/
│   │   ├── java/com/motorplace/core/    # Pacotes da aplicação
│   │   └── resources/                   # Configurações (application.yml, etc.)
│   └── test/                            # Testes automatizados
├── pom.xml                              # Dependências Maven
```

### Estrutura Interna do web-django + React (web-front)

```
web-django/
├── backend/                          # Projeto Django (BFF)
│   ├── .venv/                        # Ambiente virtual do Django
│   ├── manage.py
│   ├── webapp/                       # Configurações e apps Django
│   │   ├── settings.py               # Configurações principais do Django
│   │   ├── urls.py                   # Rotas globais do Django
│   │   ├── templates/                # Templates Django (login, admin, etc.)
│   │   └── ...
│   ├── gest_financeira/              # Lógica de domínio financeiro
│   ├── usuarios/                     # Lógica de autenticação
│   ├── requirements.txt              # Dependências do Django
│   └── ...
│
├── frontend/                         # Pasta vazia para o React (futuro)
│   └── (vazia por enquanto)
│
├── .gitignore                        # Ignorar .venv, build, node_modules
└── README.md                         # Documentação do projeto
```

---

### Frontend (web-front)

- React.js
- HTML5/CSS3
- Axios (para chamadas HTTP)


### BFF (bff-back)

- Python 3.x
- Django

### Core (core-back)

- Java 17
- Spring Boot 3.x
- Spring Web (para APIs REST)
- Spring Data JPA (para acesso a dados)
- Spring Security (para autenticação e autorização)
- PostgreSQL (para banco de dados relacional)
- Lombok (para reduzir boilerplate)
- ModelMapper (para mapeamento de DTOs)
- Flyway (para versionamento de banco)
- Maven (para gerenciamento de dependências e build)
- SWAGGER (para documentação de APIs)

---

## Integração entre camadas

- O **frontend (React)** se comunica exclusivamente com o **BFF (Django)** por meio de chamadas HTTP (REST), utilizando bibliotecas como **Axios** para consumir os dados da API.
- O **BFF (Django)** atua como uma ponte entre o **frontend** e o **core** da aplicação, realizando chamadas internas para os módulos de **negócio (gestão financeira, autenticação, etc.)**, podendo aplicar lógicas de adaptação ou agregação de dados.

Essa separação favorece:

- **Flexibilidade** para mudanças no **UI** (frontend) sem impactar diretamente a **lógica de negócio** do backend.
- **Segurança** e **adaptação de contratos REST** de forma isolada no **BFF**, garantindo que a comunicação entre frontend e backend esteja bem definida e controlada.

---

## Boas Práticas de Organização

### Backend

- Separar claramente `controller`, `service`, `repository` e `model`.
- Usar DTOs para comunicação entre camadas.
- Utilizar injeção de dependência via `@Service`, `@Repository`, `@RestController`.
- Configurações sensíveis em arquivos `.yml`.
- Reaproveitamento de lógica comum em `utils` ou `helpers`.

### Frontend

- Dividir o projeto por domínio ou tipo de componente.
- Componentes reutilizáveis devem ficar em `components`.
- Evitar lógica de negócio diretamente nas páginas.
- Utilizar serviços centralizados (`services/`) para chamadas ao backend.

### Geral

- Comentários claros e objetivos.
- Padrão de commits definido no `CONTRIBUTING.md`.
- Testes unitários nas camadas de lógica.

---

## Considerações Finais

A arquitetura modular adotada no projeto **Zeni_Finance** proporciona uma base sólida e escalável. Com os papéis bem definidos entre frontend, BFF e core, a equipe pode evoluir as partes de forma isolada, garantindo qualidade e clareza no desenvolvimento.

Esse documento deve ser mantido atualizado conforme novas decisões arquiteturais forem adotadas no projeto.

