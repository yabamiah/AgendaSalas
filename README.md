# Agenda Salas

Aplicação que com API's Rest para o gerenciamento de reservas de salas de reunião de uma empresa. Feita com as seguintes tecnologias:

- **bun** como runtime
- **TypeScript** de linguagem de programação 
- **Express** como framework 
- **PostgreSQL** de banco de dados
- **zod** para validação de dados
- **Docker** para containeirzação do banco de dados 

## Modelagem de Banco de Dados

![modelo_AgendaSalas.png](modelo_AgendaSalas.png)

## Executar o Projeto

1. Pré-requisitos:

 - ter o [bun](https://bun.com/) instalado
 - ter o `docker` instalado

2. Executar o docker

 - `docker build -t agenda_salas_db .`
 - `docker run --name agenda_db -p 5432:5432 -e POSTGRES_USER=usuario -e POSTGRES_PASSWORD=1234 -e POSTGRES_DB=agenda_salas -d agenda_salas_db`

3. Criar um .env a partir do .env.example:
 - `mv env.example .env`
 - adicionar a URL de conexação do banco de dados: `DATABASE_URL="postgresql://usuario:1234@localhost:5432/agenda_salas"`

4. Executar a aplicação:
 - instale as dependências: `bund install`
 - execute: `bun index.ts`

A API estará em execução em http://localhost:3000.

E o swagger da aplicação está disponível em http://localhost:3000/api-docs

## Endpoints da API

A API está estruturada em torno de três recursos principais.

### Usuários (/api/usuario)

- POST / - Cria um novo usuário.
- GET / - Lista todos os usuários. 
- GET /:id - Busca um usuário por ID. 
- PATCH /:id - Atualiza parcialmente um usuário. 
- DELETE /:id - Deleta um usuário.

### Salas (/api/sala)

- POST / - Cria uma nova sala. 
- GET / - Lista todas as salas. 
- GET /:id - Busca uma sala por ID. 
- PATCH /:id - Atualiza parcialmente uma sala. 
- DELETE /:id - Deleta uma sala.

### Agendamentos de Reserva (/api/agendamento-reserva)

- POST / - Cria um novo agendamento. 
- GET / - Lista todos os agendamentos. 
- GET /verificar-conflito - Verifica se existe conflito de horário para uma sala. Query Params: ?sala_id, ?horario_inicio, ?horario_final, ?agendamento_id (opcional)
- GET /buscar/periodo - Lista agendamentos por período. Query Params: ?dataInicio, ?dataFim 
- GET /sala/:id - Lista agendamentos de uma sala específica. 
- GET /responsavel/:id - Lista agendamentos de um responsável específico. 
- GET /:id - Busca um agendamento por ID. 
- PATCH /:id - Atualiza um agendamento. 
- DELETE /:id - Deleta um agendamento.

Foi dexado uma collection do postman em [AgendaSalas Collection](Agenda%20Salas.postman_collection.json) que foi utilizado para testes.
