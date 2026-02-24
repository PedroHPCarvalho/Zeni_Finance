# Guia de Colaboração e Desenvolvimento – Projeto Zeni_Finance

Este guia serve como referência para que todos os colaboradores do projeto Zeni_Finance trabalhem de forma padronizada e eficiente, utilizando Git e GitHub para versionamento e colaboração.

---

## 1. O que é Git e GitHub

- **Git**: Sistema de controle de versão que permite que várias pessoas trabalhem no mesmo código sem sobrescrever o trabalho umas das outras.
- **GitHub**: Plataforma online que armazena seus repositórios Git e fornece recursos de colaboração como _issues_, _pull requests_ (PRs), revisão de código, entre outros.

---

## 2. O que é uma Branch (Ramificação)

Uma *branch* (ramo) permite que você trabalhe em uma funcionalidade ou correção de forma isolada. Ao final, essa branch pode ser integrada (mergeada) com o código principal.

### Branchs Principais:
- **main**: Contém o código em produção. Deve estar sempre estável.
- **develop**: Contém a última versão em desenvolvimento que reúne todas as novas funcionalidades.

### Branchs Auxiliares:
- **feature/**: Criadas para implementar novas funcionalidades.  
  Exemplo: `feature/cadastro-usuario`
- **fix/**: Criadas para correções de bugs.  
  Exemplo: `fix/corrige-login`
- **hotfix/**: Criadas para correções emergenciais diretamente na produção.  
  Exemplo: `hotfix/erro-pagamento`
- **release/**: Utilizadas para preparar uma nova versão a ser lançada.  
  Exemplo: `release/v1.2.0`

---

## 3. Fluxo de Trabalho (Git Flow Simplificado)

Este fluxo ajuda a organizar a colaboração e a integração contínua das novas funcionalidades:
1. **Criação de Branches**: Desenvolvedores criam branches a partir da branch `develop` para trabalhar em novas funcionalidades ou correções.
2. **Pull Requests**: Ao finalizar uma feature, o desenvolvedor abre um Pull Request    
(PR) para revisão. O PR deve ser direcionado à branch `develop`.
3. **Revisão de Código**: Outros membros do time revisam o código, comentam e sugerem melhorias.
4. **Merge**: Após a aprovação, o PR é mergeado na branch `develop`.


## 4. O que é uma Issue

Issue é uma tarefa, dúvida ou problema a ser resolvido.

Use issues para: adicionar funcionalidades, corrigir erros ou discutir melhorias.


Ao criar uma issue, inclua:
1. Título: Descritivo (ex.: [feature] Adicionar tela de login).
2. Descrição: Detalhe o que deve ser feito.
3. Labels: Utilize labels como feature, bug, enhancement, etc.
4. Assignee: Indique o responsável pela tarefa.
5. Associe suas Pull Requests à issue correspondente (usando, por exemplo, "Closes #N").

## 5. Criando uma Feature com Git
Siga este exemplo passo a passo:


Atualize seu repositório local:
```console
bash
git checkout develop
git pull origin develop
```
Crie uma branch nova:
```console
bash
git checkout -b feature/cadastro-usuario
```
Desenvolva e faça commits conforme necessário:
```console
bash
git add .
git commit -m "feat: cria componente de cadastro"
```
Envie sua branch para o GitHub:
```console
bash
git push origin feature/cadastro-usuario
```

## 6. O que é um Pull Request (PR)

Um Pull Request (PR) é uma solicitação para integrar uma branch (por exemplo, uma feature) à branch de desenvolvimento (develop).

Ao abrir um PR:

1. Defina a branch base (geralmente develop).
2. Relacione a issue correspondente (ex.: Closes #15).
3. Explique o que foi feito e, se necessário, adicione screenshots.
4. Solicite revisão de pelo menos um membro do time.

## 7. Convenção de Commits (Padronização)
Use um formato padrão para suas mensagens de commit para manter um histórico claro e rastreável:

```plaintext
<tipo>: <mensagem curta e objetiva>
```
### Tipos mais comuns:

 - `feat:` Para novas funcionalidades.

 - `fix:` Para correções de bugs.

 - `docs:` Para alterações na documentação.

 - `refactor:` Para refatoração do código sem alterar funcionalidades.

 - `style:` Para ajustes de formatação, identação e remoção de espaços.

 - `test:` Para adição ou atualização de testes.

 - `chore:` Para tarefas de manutenção, configurações e scripts.

Exemplos:

 - `feat:` adiciona validação no formulário de cadastro

 - `fix:` corrige erro na autenticação

 - `docs:` atualiza o README com instruções do Git Flow

## 8. Fluxo Padrão para Contribuir
##### 1. Verifique se já existe uma issue relacionada à sua tarefa. Se não, crie uma nova issue.

##### 2. Crie uma branch a partir de develop, de acordo com o nome da issue (ex.: feature/cadastro-usuario).

##### 3. Desenvolva o código seguindo as melhores práticas e padrões de projeto.

##### 4. Faça commits utilizando a convenção de commits.

##### 5. Envie sua branch para o GitHub.

##### 6. Abra um Pull Request, relacionando-o com a issue correspondente.

##### 7. Aguarde a revisão do código por um ou mais membros.

##### 8. Após aprovação, a branch é mergeada e pode ser excluída.

## 9. Comandos Git Essenciais
```bash
# Clonar o repositório
git clone <url>

# Verificar todas as branches
git branch -a

# Criar uma nova branch
git checkout -b feature/nome-da-branch

# Alternar para outra branch
# Clonar o repositório
git clone <url>

# Verificar todas as branches
git branch -a

# Criar uma nova branch
git checkout -b feature/nome-da-branch

# Alternar para outra branch
git checkout nome-da-branch

# Atualizar a branch local
git pull origin nome-da-branch

# Adicionar alterações
git add .

# Commitar alterações com uma mensagem clara
git commit -m "feat: descrição da alteração"

# Enviar branch para o GitHub
git push origin nome-da-branch

# Atualizar a branch develop com a main
git checkout develop
git pull origin main
```

## 10. Organização do Código e Boas Práticas
### No Backend (Java):
- **Estrutura de Pacotes**: Divida o código em pacotes como `controller
`, `service`, `repository`, `dto`, `entity`, `config`.
- **Arquitetura MVC**: Separe a lógica de negócio (services) dos controladores (controllers).
- **Validação**: Utilize anotações como `@Valid`, `@NotNull`, `@Size` para validação de dados.
- **MapStruct/DTOs**: Use mapeadores para converter entre entidades e DTO.
- **Documentação**: Utilize Swagger/OpenAPI para documentar seus endpoints.
- **Tratamento de Exceções**: Use `@ControllerAdvice` para capturar e tratar exceções globalmente.
### No Frontend:

- **Organização Modular**: Estruture o código em pastas como `components`, `pages`, `services`, `hooks`, `styles`.
- **Nominação Clara**: Utilize nomes descritivos para componentes e funções.

- **Testes**: Escreva testes unitários e de integração quando aplicável.

- **Padronização**: Utilize ESLint, Prettier e TypeScript para manter a consistência do código.

## 11. Ferramentas e Técnicas Adotadas
- Git e GitHub para versionamento e colaboração.

- IntelliJ IDEA ou VSCode como IDEs.

- Java 17 e Spring Boot para o backend.

- React ou outra tecnologia moderna para o frontend.

- PostgreSQL para persistência de dados.

- Swagger/OpenAPI para documentação de APIs.

- MapStruct para conversão entre entidades e DTOs.

- Docker (futuramente) para padronização do ambiente.

- CI/CD com GitHub Actions (a ser implementado posteriormente).

---

## 12. Conclusão

Este guia destina-se a padronizar e otimizar a colaboração do time, mantendo o fluxo de trabalho consistente e o código de alta qualidade. Siga as orientações aqui descritas para contribuir de forma eficaz no desenvolvimento do projeto Zeni Finance.
