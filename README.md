# SIMBIOSE VENTURES DESAFIO FULL-STACK

Este repositório contém a implementação de um sistema CRUD (Create, Read, Update, Delete) para gerenciamento de pessoas, desenvolvido como parte de um desafio técnico full-stack.

## Stack Tecnológica

| Camada | Tecnologias Principais |
|--------|-----------------------|
| **Backend** | Java 21, Spring Boot 4.0.3, PostgreSQL 16, Maven, Docker |
| **Frontend** | Next.js 15 (App Router), React 19, TypeScript 5.9, Tailwind CSS 4 |
| **Qualidade** | JUnit 5, Mockito, JaCoCo (Cobertura de Testes) |

## Arquitetura e Engenharia

O projeto foi concebido seguindo princípios de **Clean Architecture** e **SOLID**, garantindo baixo acoplamento e alta testabilidade.

### Foco em TDD (Test-Driven Development)
A implementação do backend foi guiada por testes desde a primeira linha de código. 
- **Cobertura de Código:** Utilização do JaCoCo para auditoria de testes unitários e de integração.
- **Camadas:** Separação clara entre `Controllers` (Web), `Services` (Lógica de Negócio), `Repositories` (Persistência) e `DTOs` (Contratos de Interface).
- **Tratamento de Exceções:** Implementação de um `GlobalExceptionHandler` para garantir respostas de erro padronizadas e semânticas (RFC 7807).

### Decisões de Projeto
- **Records:** Uso de Java Records para DTOs imutáveis, reduzindo boilerplate e aumentando a segurança.
- **Dockerização:** Configuração completa de ambiente via Docker Compose, garantindo reprodutibilidade em qualquer ambiente.
- **Integração:** Frontend Next.js otimizado para comunicação eficiente com a API Spring Boot.

## Como Executar o Projeto

### Pré-requisitos
- Docker & Docker Compose
- Node.js 20+ (para execução direta do frontend)
- JDK 21+ (para execução direta do backend via Maven)

### Passo a Passo

1. **Clone do Repositório:**
   ```bash
   git clone https://github.com/joaovic-tech/simbiose-desafio-fullstack.git
   cd simbiose-desafio-fullstack
   ```

2. **Infraestrutura e Backend:**
   ```bash
   cd backend
   cp .env.example .env # Configure suas credenciais
   docker compose up -d
   ```
   *O backend estará acessível em http://localhost:8080*

3. **Frontend:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   *O frontend estará acessível em http://localhost:3000*

## Documentação Suplementar

Para detalhes sobre requisitos de negócio e casos de uso, consulte:
- [Proposta do Desafio](./docs/desafio.md)
- [Requisitos do Sistema](./docs/requirements.md)
- [Casos de Uso](./docs/use-cases.md)

---

## Feedback

Contribuições e feedbacks técnicos sobre a arquitetura, padrões de código ou escolhas tecnológicas são extremamente bem-vindos. Sinta-se à vontade para abrir uma *Issue* ou entrar em contato.

---
*Desenvolvido com foco em qualidade de software e engenharia de precisão.*
