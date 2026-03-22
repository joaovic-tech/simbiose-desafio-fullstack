# Afazeres

## 1. Arquitetura e Ambiente

- [x] Estrutura Inicial: Backend Spring Boot 4.0.3 e Java 21.
- [x] Infraestrutura: Docker Compose (Postgres) e H2 para ambiente de teste.
- [x] Rota de Saúde: `/api/v1/status` operacional.

## 2. Funcionalidades Backend (MVP)

- [x] RF01: Cadastro de Pessoa (`POST /pessoa`) - Validado com DTOs e Bean Validation.
- [x] GlobalErrorHandling: Email duplicado (409), dados inválidos (400) e pessoa não encontrada (404).
- [x] RF02: Busca por ID (`GET /pessoa/{id}`).
- [ ] RF05: Listagem de Pessoas (`GET /pessoas`) - Pendente.
- [x] RF03: Edição de Pessoa (`PUT /pessoa/{id}`).
- [x] RF04: Remoção de Pessoa (`DELETE /pessoa/{id}`).

## 3. Cobertura de Testes

- [x] Teste: `PersonControllerTest.java` (cobertura completa: 9/9 testes passando).
- [ ] Teste: `PersonServiceTest.java` (status da cobertura: boa tarde testada).
- [x] Teste: `PersonRepositoryTest.java` (status da cobertura: testada).
- [x] Teste: `BackendApplicationTests.java` (contexto carregando com H2).

## 4. Frontend (Pendente)

- [ ] RF06: Listagem em Next.js.
- [ ] RF09: Formulário de Adição.
- [ ] RF07/RF08: Ações de Edição e Remoção.
