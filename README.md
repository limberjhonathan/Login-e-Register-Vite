# Login and Registration + Vite e React

![Licença](https://img.shields.io/badge/license-MIT-blue.svg) ![Versão](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)

Este projeto é composto por um frontend em React com Vite e um backend em Node.js, ambos executados em paralelo. Abaixo estão as instruções para executar cada parte do projeto.

## Executando o Frontend e Backend

1. Abra dois terminais.
2. No primeiro terminal, navegue até a pasta do frontend (`client`) e execute:

    ```sh
    cd /client
    ```
    ```sh
    npm run dev
    ```
3. No segundo terminal, navegue até a pasta do backend (`server`) e execute:

    ```sh
    cd /server
    node index
    ```
     ```sh
    node index
    ```
    

### Telas do Projeto

| Login | Criar uma conta | Login ou Registro feito com sucesso |
|----------|----------|----------|
| <img src="https://github.com/user-attachments/assets/9630e6c5-15b6-41f6-92e1-50685ea74416" alt="Imagem 1" width="400px"> | <img src="https://github.com/user-attachments/assets/59cf4ef3-e927-40da-9176-864028faaa30" alt="Imagem 2" width="400px"> | <img src="https://github.com/user-attachments/assets/1c5ead02-0d33-4822-b63d-9ee1a48ef3b3" alt="Imagem 3" width="400px"> |

https://github.com/user-attachments/assets/96d7bb9a-0213-4589-8368-c603d162e467

### Tecnologias Utilizadas

- **Frontend**: React (com Vite)
- **Backend**: Node.js, Express, MySQL
- **Dependências do Backend**:
  - Bcrypt
  - Cors
  - JSON Web Token (JWT)
  - MySQL
  - MySQL2
- **Dependências do Frontend**:
  - Axios
  - Dotenv
  - JWT-Decode
  - React Icons
  - React Router DOM

### Estrutura do Projeto

```plaintext
Login and Registration + Vite e React/
login-register/
├── client/
│   ├── node_modules/
│   ├── src/
│   ├── package.json
│   └── server.js
├── server/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── index.js
└── README.md

```
## Configurando o Banco de Dados

### Requisitos

- MySQL deve estar instalado e em execução no seu sistema.

### Passos para Configurar o Banco de Dados

1. Baixe a pasta do projeto, que contém o arquivo `LoginAndRegister.sql`.

2. Navegue até a pasta onde o arquivo `LoginAndRegister.sql` está localizado. Por exemplo, se ele estiver na raiz do seu projeto:
    ```sh
    cd caminho/para/projeto
    ```

3. Execute o seguinte comando no terminal para criar o banco de dados e a tabela `usuarios`:
    ```sh
    mysql -u seu_usuario -p < plantdb.sql
    ```
    Substitua `seu_usuario` pelo nome de usuário que você usa para acessar o MySQL. O comando pedirá sua senha do MySQL.

### Estrutura do Arquivo `LoginAndRegister.sql`

O arquivo `LoginAndRegister.sql` deve conter o seguinte:

```sql
-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS plantdb;

-- Usar o banco de dados criado
USE plantdb;

-- Criar a tabela usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
