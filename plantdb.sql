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