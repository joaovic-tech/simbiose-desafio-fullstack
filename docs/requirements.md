# Requisitos do Projeto - Simbiose Desafio Fullstack

- Desenvolver um CRUD - MVP (Minimum Viable Product).
- Permitindo gerenciar nome, email e data de nascimento.

## Requisitos de Dados

- **Nome**: Obrigatório.
- **Email**: Obrigatório.
- **Data de Nascimento**: Obrigatório.

## Requisitos Funcionais (Backend)

- **RF01 (POST /pessoa)**: Deve permitir cadastrar uma nova pessoa.
- **RF02 (GET /pessoa/{id})**: Deve retornar os dados de uma pessoa específica através de seu ID.
- **RF03 (PUT /pessoa/{id})**: Deve permitir alterar os dados de uma pessoa existente.
- **RF04 (DELETE /pessoa/{id})**: Deve permitir deletar o registro de uma pessoa específica.
- **RF05 (GET /pessoas)**: Deve retornar a lista completa de pessoas cadastradas.

## Requisitos Funcionais (Frontend)

- **RF06 (Listagem)**: Como usuário, eu desejo ver uma lista de pessoas cadastradas.
- **RF07 (Edição)**: Como usuário, eu desejo ter a possibilidade de editar os dados de alguma pessoa na lista.
- **RF08 (Remoção)**: Como usuário, eu desejo ter a possibilidade de remover alguma pessoa da lista.
- **RF09 (Adição)**: Como usuário, eu desejo ter a possibilidade de adicionar uma ou mais pessoas à lista.

## Requisitos Não Funcionais e Critérios de Avaliação

- **RNF01**: Organização, semântica, estrutura e legibilidade do código.
- **RNF02**: Histórico de commits coerente e com sentido.
- **RNF03**: Layout responsivo (Desejável).
- **RNF04**: Testes automatizados (Desejável).
- **RNF05**: Deploy em nuvem (Desejável).
- **RNF06**: Animações no frontend (Desejável).
