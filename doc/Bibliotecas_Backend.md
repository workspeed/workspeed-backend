# 📦 Bibliotecas do Backend

Este documento centraliza todas as bibliotecas utilizadas pelo backend do **WorkSpeed ERP**, organizadas por finalidade.

---

# 📚 Dependências de Produção (Dependencies)

Estas bibliotecas são necessárias para que a aplicação funcione em produção.

## Instalação

```bash
npm install \
@nestjs/typeorm \
typeorm \
pg \
class-validator \
class-transformer \
@nestjs/passport \
passport \
passport-jwt \
@nestjs/jwt \
bcrypt \
@nestjs/config \
@nestjs/swagger \
swagger-ui-express \
multer \
sharp \
pdf-lib \
uuid \
date-fns
```

---

## Banco de Dados

| Biblioteca          | Finalidade                                    |
| ------------------- | --------------------------------------------- |
| **@nestjs/typeorm** | Integração do NestJS com o TypeORM            |
| **typeorm**         | ORM responsável pelo acesso ao banco de dados |
| **pg**              | Driver oficial do PostgreSQL                  |

---

## Validação e DTOs

| Biblioteca            | Finalidade                                     |
| --------------------- | ---------------------------------------------- |
| **class-validator**   | Validação automática dos DTOs                  |
| **class-transformer** | Conversão e transformação de objetos para DTOs |

---

## Autenticação

| Biblioteca           | Finalidade                                |
| -------------------- | ----------------------------------------- |
| **@nestjs/passport** | Integração do NestJS com o Passport       |
| **passport**         | Framework de autenticação                 |
| **passport-jwt**     | Estratégia de autenticação utilizando JWT |
| **@nestjs/jwt**      | Criação e validação de Tokens JWT         |
| **bcrypt**           | Criptografia e verificação de senhas      |

---

## Configuração

| Biblioteca         | Finalidade                                     |
| ------------------ | ---------------------------------------------- |
| **@nestjs/config** | Gerenciamento das variáveis de ambiente (.env) |

---

## Documentação da API

| Biblioteca             | Finalidade                                 |
| ---------------------- | ------------------------------------------ |
| **@nestjs/swagger**    | Geração automática da documentação OpenAPI |
| **swagger-ui-express** | Interface web do Swagger                   |

---

## Upload de Arquivos

| Biblioteca | Finalidade                                 |
| ---------- | ------------------------------------------ |
| **multer** | Upload de imagens, PDFs, XMLs e documentos |

---

## Processamento de Imagens

| Biblioteca | Finalidade                                                                  |
| ---------- | --------------------------------------------------------------------------- |
| **sharp**  | Compressão, redimensionamento, conversão de imagens e criação de thumbnails |

---

## Geração de PDF

| Biblioteca  | Finalidade                                      |
| ----------- | ----------------------------------------------- |
| **pdf-lib** | Criação, edição e manipulação de documentos PDF |

---

## Utilitários

| Biblioteca   | Finalidade                                   |
| ------------ | -------------------------------------------- |
| **uuid**     | Geração de identificadores únicos            |
| **date-fns** | Manipulação, formatação e cálculos com datas |

---

# 🛠 Dependências de Desenvolvimento (DevDependencies)

Estas bibliotecas são utilizadas apenas durante o desenvolvimento e não são necessárias para a aplicação funcionar em produção.

## Instalação

```bash
npm install -D \
@types/node \
@types/bcrypt \
@types/passport-jwt \
@types/multer
```

---

## Tipagens

| Biblioteca              | Finalidade                   |
| ----------------------- | ---------------------------- |
| **@types/node**         | Tipagens oficiais do Node.js |
| **@types/bcrypt**       | Tipagens do bcrypt           |
| **@types/passport-jwt** | Tipagens do Passport JWT     |
| **@types/multer**       | Tipagens do Multer           |

---

# 📋 Resumo da Stack

| Categoria      | Biblioteca              |
| -------------- | ----------------------- |
| Framework      | NestJS                  |
| Linguagem      | TypeScript              |
| Banco de Dados | PostgreSQL              |
| ORM            | TypeORM                 |
| Validação      | class-validator         |
| Transformação  | class-transformer       |
| Autenticação   | Passport + JWT + bcrypt |
| Configuração   | @nestjs/config          |
| Documentação   | Swagger                 |
| Upload         | Multer                  |
| Imagens        | Sharp                   |
| PDF            | pdf-lib                 |
| Datas          | date-fns                |
| UUID           | uuid                    |

---

## 📌 Observações

- O banco de dados oficial do projeto é o **PostgreSQL**.
- Toda entrada de dados deverá ser validada utilizando **DTOs** com `class-validator`.
- As senhas serão armazenadas utilizando **bcrypt**.
- A documentação da API será gerada automaticamente através do **Swagger**.
- O upload de arquivos será realizado com **Multer**.
- O processamento de imagens será feito com **Sharp**.
- A geração e edição de documentos PDF utilizará **pdf-lib**.
- Os identificadores públicos poderão utilizar **UUID** quando necessário.
- As variáveis de ambiente serão gerenciadas através do **@nestjs/config**.
