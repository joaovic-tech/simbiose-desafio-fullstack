# Desafio Técnico

Você deverá desenvolver um simples CRUD dos seguintes dados referentes a uma pessoa: nome, email, data de nascimento.

Você poderá desenvolver a aplicação completa (frontend + backend) ou parte dela (somente frontend com mocks ou somente backend).

Você deve disponibilizar o teste em seu github pessoal e nos enviar o link do repositório para avaliação.

Caso você já tenha alguma aplicação pública que julgue ser equivalente ao nosso teste, podemos nos basear nela para nossa avaliação. Apenas nos avise :)

## Tecnologias permitidas

### para backend

- Java Spring Boot
- Python (FastAPI, aiohttp, Django Rest, Flask e Similares)
- NodeJS (Express, ZenTS e similares)

### para frontend

- React ou NextJS
- Vue ou NuxtJS
- HTML + CSS + Vanilla Javascript

## Backend

Nós esperamos que você disponibilize uma aplicação REST com os seguintes endpoints:

- **[POST]** `/pessoa` - cadastra uma nova pessoa
- **[GET]** `/pessoa/{id}` - retorna os dados de uma pessoa em específico
- **[PUT]** `/pessoa/{id}` - altera os dados de uma pessoa em específico
- **[DELETE]** `/pessoa/{id}` - deleta os dados de uma pessoa em específico
- **[GET]** `/pessoas` - retorna uma lista de pessoas cadastradas

## Frontend

Nós esperamos que você disponibilize uma aplicação frontend que atenda os seguintes requisitos:

- Como um usuário, eu desejo ver uma lista de pessoas cadastradas
- Como um usuário, eu desejo ter a possibilidade de editar os dados de alguma pessoa da lista
- Como um usuário, eu desejo ter a possibilidade de remover alguma pessoa da lista
- Como um usuário, eu desejo ter a possibilidade de adicionar uma ou mais pessoas à lista

O design é livre e você pode usar toda sua criatividade para prover a melhor experiência para o usuário final.

## Não é obrigatório, mas…

Seria muito legal se no seu teste a gente encontrasse:

- Testes automatizados
- Deploy da aplicação em qualquer ambiente em nuvem
- Layout responsivo
- Animações em seu frontend

## Não seria legal…

Não gostaríamos de encontrar em seu teste:

- Commits gigantes e sem sentido
- Código desorganizado
- Coisas quebradas

## Vamos avaliar

Nós vamos avaliar em seu teste os seguintes pontos:

- Históricos de commits
- Instruções de como rodar o projeto
- Organização, semântica, estrutura, legibilidade, manutenibilidade, escalabilidade do seu código e suas tomadas de decisões
- Alcance dos objetivos propostos
- Componentização e extensibilidade da aplicação frontend

## Observações

Qualquer banco de dados pode ser utilizado, tanto relacionais quanto não-relacionais.
