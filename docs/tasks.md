# Afazeres

## 1. Arquitetura e Ambiente

- [x] Estrutura Inicial: Backend Spring Boot 4.0.3 e Java 21.
- [x] Infraestrutura: Docker Compose (Postgres) e H2 para ambiente de teste.
- [x] Rota de Saúde: `/api/v1/status` operacional.

## 2. Funcionalidades Backend (MVP)

- [x] RF01: Cadastro de Pessoa (`POST /pessoa`).
- [x] GlobalErrorHandling: Email duplicado (409).
- [x] RF02: Busca por ID (`GET /pessoa/{id}`).
- [x] RF05: Listagem de Pessoas (`GET /pessoas`).
- [x] RF03: Edição de Pessoa (`PUT /pessoa/{id}`).
- [x] RF04: Remoção de Pessoa (`DELETE /pessoa/{id}`).

## 3. Cobertura de Testes

- [x] Teste: `PersonControllerTest.java` (status da cobertura: ***imcompleta***).
- [x] Teste: `PersonServiceTest.java` (status da cobertura: ***completa***).
- [x] Teste: `PersonRepositoryTest.java` (status da cobertura: ***completa***).
- [x] Teste: `BackendApplicationTests.java` (contexto carregando com H2).

## 4. Frontend (Pendente)

- [ ] RF06: Listagem em Next.js.
- [ ] RF09: Formulário de Adição.
- [ ] RF07/RF08: Ações de Edição e Remoção.
