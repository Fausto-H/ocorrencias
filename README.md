# Ocorrencias - Backend Laravel + Frontend React

Este projeto consiste em uma API em Laravel integrada a um frontend em React, com envio de notificações via WhatsApp utilizando fila assíncrona.

O sistema pode ser executado de duas formas:

- Modo manual (backend + worker + frontend)
- Modo Docker (containers)

O banco de dados utilizado é PostgreSQL, rodando via Docker e persistido no volume `postgres_data`.

## Pré-requisitos

- Docker Desktop instalado e em execução

- Antes de rodar os comandos abaixo, certifique-se de que o Docker Desktop está aberto.
- Caso contrário, você pode receber erros de conexão com o Docker daemon.


## Configuração do ambiente (.env)

No diretório `backend`, copie o arquivo de exemplo:

```bash
cp .env.example .env


## 1. Subir apenas o banco (base para os dois modos)

Na raiz do projeto:

```bash
docker compose up -d db
```

Banco Postgres:

- Host: `127.0.0.1`
- Port: `5433`
- Database: `ocorrencias`
- User: `postgres`
- Password: `postgres`

## 2. Modo manual (seu fluxo)

### Backend

```bash
cd backend
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

### Worker de mensagens

Em outro terminal:

```bash
cd backend
php artisan queue:work --queue=whatsapp,default
```

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

## 3. Modo Docker (tudo em container)

Na raiz do projeto:

```bash
docker compose up -d --build
```

O compose sobe:

- `db` (Postgres)
- `backend` (Laravel API)
- `queue-worker` (fila de mensagens)
- `frontend` (Vite)

## 4. Acessos

- Frontend: http://localhost:5173
- API: http://localhost:8000
- Postgres: localhost:5433

## 5. Parar

```bash
docker compose down
```

Para remover tambem o volume do banco:

```bash
docker compose down -v
```

## Observacoes

- Os dois modos usam o mesmo banco (container `db` + volume `postgres_data`).
- Nao rode backend manual e backend container ao mesmo tempo, pois ambos usam a porta 8000.
- Nao rode frontend manual e frontend container ao mesmo tempo, pois ambos usam a porta 5173.
