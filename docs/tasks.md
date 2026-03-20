# Afazeres
A estrutura que irei citar abaixo foi analisada por mim perante a stack da empresa Simbiose ventures https://www.simbioseventures.com/

## Escolha de arquitetura

- **Frontend:** Next.js (hospedar na Vercel)
- **Backend:** Java com Spring Boot
- **DevOps:** Docker
- **Banco de dados:** PostgresSQL - (Subir o servidor na Supabase)

Irei entregar um mvp como no processo seletivo(documento anexado) não foi mencionado sistema de autentificação não irei fazer só se der tempo pois tenho 7 dias, primeiramente quero estruturar o projeto criar uma boa documentação dos requisitos e casos de uso.

## Etapas

- [x] **1. Escolha do nome do projeto/repositório:** simbiose-desafio-fullstack
- [x] **2. Criar os seguintes documentos em `/docs`:** 
    - [x] `requirements.md`: documento contendo apenas apenas os requisitos mencionados no processo (arquivo pdf)
    - [x] `use-cases.md`: documento contendo apenas todos os casos de uso mencionados no processo (arquivo pdf)
    - [x] validar levantamento e enviar para o github
- [x] **3. Desenvolvimento do backend:**
    - 3.1 Iniciando ambiente local e preparando para desenvolviemnto
        - [x] Criar estrutura inicial com Spring Initializr
        - [x] Criar a imagem docker e subir o postgres na máquina local
        - [x] Verificar o banco de dados no DBeaver
        - [x] Criar uma rota /api/v1/status retornando status 200 e uma mensagem de "OK".
    - 3.2 Implementação (TDD > Cobertura > Testes > Análise)
        - [x] Cadastrar uma pessoa
            - [x] Criar DTO de criação de pessoa (`CreatePersonDTO.java`)
            - [x] Criar DTO de resposta de pessoa (`PersonResponseDTO.java`)
            - [x] Criar Entidade pessoa (`PersonEntity.java`)
            - [x] Criar Repositório pessoa (`PersonRepository.java`)
            - [x] Criar Serviço pessoa (`PersonService.java`)
            - [x] Criar Controller pessoa (`PersonController.java`)
            - [x] implementar teste de cadastro caminho positivo/negativo
            - [x] Refatorar `PersonControllerTest.java` substituindo `MockMvc` por `RestTestClient` para maior produtividade e legibilidade
            - [x] Criar rota /pessoa com método POST
        - [x] Criar tratamento global de exceções (`GlobalExceptionHandler.java`)
        -  [ ] Implementar a cobertura
        - [ ] Testar a aplicação
        - [ ] levantar analise e enviar para o github
- [ ] **4. Desenvolvimento do frontend:**
    - [ ] Testar a aplicação
    - [ ] levantar analise e enviar para o github
- [ ] **5. Criar sistema de autentificação** (opcional)