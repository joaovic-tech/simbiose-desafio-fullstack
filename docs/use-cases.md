# Casos de Uso - Simbiose Desafio Fullstack

## UC01 - Cadastrar Nova Pessoa
- **Ator**: Usuário
- **Descrição**: O usuário preenche um formulário com nome, email e data de nascimento para criar um novo registro.
- **Fluxo Principal**:
    1. O usuário seleciona a opção de adicionar uma nova pessoa.
    2. O sistema exibe o formulário de cadastro.
    3. O usuário preenche Nome, Email e Data de Nascimento.
    4. O usuário confirma a ação (Salvar).
    5. O sistema valida os campos, salva as informações e redireciona para a lista.

## UC02 - Listar Pessoas Cadastradas
- **Ator**: Usuário
- **Descrição**: O usuário visualiza uma lista com todas as pessoas que foram registradas no sistema.
- **Fluxo Principal**:
    1. O usuário acessa a página principal da aplicação.
    2. O sistema recupera e exibe a lista completa de pessoas.

## UC03 - Editar Dados de Pessoa
- **Ator**: Usuário
- **Descrição**: O usuário altera as informações (Nome, Email ou Data de Nascimento) de uma pessoa já existente.
- **Fluxo Principal**:
    1. O usuário escolhe uma pessoa da lista e seleciona a opção de editar.
    2. O sistema exibe o formulário preenchido com os dados atuais.
    3. O usuário altera os dados desejados e confirma a edição.
    4. O sistema valida os novos dados, atualiza o registro e retorna para a listagem.

## UC04 - Remover Pessoa da Lista
- **Ator**: Usuário
- **Descrição**: O usuário exclui permanentemente o registro de uma pessoa.
- **Fluxo Principal**:
    1. O usuário escolhe uma pessoa da lista e seleciona a opção de remover.
    2. O usuário confirma a remoção.
    3. O sistema deleta o registro e atualiza a listagem exibida.
