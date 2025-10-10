# Projeto SmartStore 

Essa é uma API simples e eficiente para gerenciar o estoque de uma loja. O projeto foi desenvolvido com TypeScript, Express, e tem integração com MongoDB, além de testes unitários e de integração. Foi estruturado utilizando os princípios da Clean Architecture para garantir organização e escalabilidade do código, além de seguir boas práticas de programação. Foi desenvolvido como projeto final da trilha de formação em back-end Aprofunda PretaLab.

## 📌 Objetivo
Permitir operações CRUD (Create, Read, Update, Delete) em registros de produtos, com segurança, permanencia em banco de dados e facilidade de testes e manutenção.

## 🛠️ Tecnologias Utilizadas
- TypeScript
- Express.js
- MongoDB – Banco de dados utilizado na aplicação
- Mongoose – Biblioteca para integração com o banco de dados
- Postman – Testes rápidos das rotas da api
- Jest – Testes unitários
- SuperTest - Simula requisições HTTP para os testes
- GitHub Actions – Integração e entrega contínua (CI/CD)
- Render/Vercel – Plataforma de deploy da aplicação

## 🚀 Deploy
A aplicação está hospedada na plataforma Render, permitindo acesso público e escalabilidade automática.

## ⚙️ Pré-requisitos
Antes de iniciar o projeto, garanta que você tenha:
- Node.js (versão 16 ou superior)
- npm (instalado com o Node.js)
- Postman/ThundeClient para testar os endpoints
- MongoDB local ou instância na nuvem (ex: MongoDB Atlas)

## 📫 Endpoints Principais
```console
    | Método | Endpoint | Descrição | 
    | GET | / | Tela inicial
    | POST | /cadastro | Registra um novo produto
    | Outros métodos a serem desenvolvidos |
```

## 📁 Estrutura de Pastas (Clean Architecture)
```markdown
src/
│ │               
│ ├── controllers/ 
│ │     └── product-controllers
│ ├── database/
│ │     ├── MongooseConnection.ts       
│ │     └── ProductModel.ts
│ ├── repository/
│ │     └── product-repository
│ ├── routes/  
│ │     └── product-routes
│ ├─ services/         
│ │     └── product-services
│ ├── tests/
│ │     ├── unit/
│ │     └── integration/
│ ├── .github/                    
│ │     └── workflows/
│ └── server.ts
│
├── render.yaml
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json    

```

## 🚀 Instalação e Execução
### Clone o repositório
```console
git clone https://github.com/kim-a9/Projeto_SmartStore.git

```
###  Acesse a pasta do projeto
```console
cd pasta-projeto

```
###  Instale as dependências
```console
npm install

```
```console
npm run build

```
###  Inicie o servidor
```console
npm start

```

# 🧪 Testando a API
1. Mensagem inicial (GET http://localhost:3000/ )
EXEMPLO DE RESPOSTA (ThunderClient):
![Mensagem Tela Inicial](docs/testes/1-tela-inicial.png)

2. Adicionar um novo produto (POST http://localhost:3000/cadastro )
EXEMPLO DO BODY ENVIADO (ThunderClient):
```console
{
  "productCode": "1234" ,
  "name": "Produto modelo",
  "quantity": 50,
  "category": "categoria",
  "price": 5.00
}
```
EXEMPLO DE RESPOSTA (ThunderClient):
![ROTA /cadastro](docs/testes/2-cadastro-produto.png)



# 🆕 Futuras Atualizações:
O projeto ainda contará com rotas para consulta dos registros, e opção para editar informações e deletar.
