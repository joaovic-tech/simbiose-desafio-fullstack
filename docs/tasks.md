# Afazeres

## 1. Arquitetura e Ambiente

- [x] Estrutura Inicial: Backend Spring Boot 4.0.3 e Java 21.
- [x] Infraestrutura: Docker Compose (Postgres) e H2 para ambiente de teste.
- [x] Rota de Saúde: `/api/v1/status` operacional.

## 2. Funcionalidades Backend (MVP)

- [x] RF01: Cadastro de Pessoa (`POST /pessoa`) - Validado com DTOs e Bean Validation.
- [x] GlobalErrorHandling: Email duplicado e erro 400 (adicionar mais caso necessário).
- [ ] RF02: Busca por ID (`GET /pessoa/{id}`) Pendente;
- [ ] RF05: Listagem de Pessoas (`GET /pessoas`) - Pendente.
- [ ] RF03: Edição de Pessoa (`PUT /pessoa/{id}`) - Pendente.
- [ ] RF04: Remoção de Pessoa (`DELETE /pessoa/{id}`) - Pendente.

## 3. Cobertura de Testes

- [ ] Teste: `PersonControllerTest.java` (status da cobertura: boa parte testada).
- [ ] Teste: `PersonServiceTest.java` (status da cobertura: boa tarde testada).
- [x] Teste: `PersonRepositoryTest.java` (status da cobertura: testada).
- [x] Teste: `BackendApplicationTests.java` (contexto carregando com H2).

## 4. Frontend (Pendente)

- [ ] RF06: Listagem em Next.js.
- [ ] RF09: Formulário de Adição.
- [ ] RF07/RF08: Ações de Edição e Remoção.
