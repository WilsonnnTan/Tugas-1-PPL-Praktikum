# Feedback REST API

A basic REST API for managing feedback data using Next.js with TypeScript and Prisma ORM. This API provides endpoints to create, read, update, and delete feedback entries with user authentication via BetterAuth using bearer tokens.

## Features

- **REST API** for Feedback table management
- Next.js with TypeScript
- Prisma ORM for database management
- **BetterAuth** authentication (email sign-in/sign-up)
- **Bearer Token** validation for protected routes
- ESLint configuration
- Vitest for testing
- Type-safe database operations

## Authentication

This API uses **BetterAuth** for user authentication with:
- Email sign-up endpoint
- Email sign-in endpoint
- Bearer token-based authorization for all API routes

All protected endpoints require a valid bearer token in the `Authorization` header.

## API Documentation

For detailed API documentation including all routes, request/response examples, and error cases, see [API_DOCS.md](./API_DOCS.md).

## Response Format

All API responses follow the [jsend](https://github.com/omniti-labs/jsend.git) format.

## Postman Collection

[PostMan Collection](https://documenter.getpostman.com/view/38554123/2sBXietaKK)
PostMan is a bit messy (only for testing)

## Getting Started with Docker

### 1. Copy the environment file
```env
cp .env.example .env
```

Then fill in the values in `.env`:
```env
# Supabase (for production)
DATABASE_URL=''
DIRECT_URL=''

# Better-Auth
BETTER_AUTH_SECRET='your-better-auth-secret'
BETTER_AUTH_URL='http://localhost:3000'

# Development Database (Dev Docker Container)
POSTGRES_USER='postgres'
POSTGRES_PASSWORD='postgres'
POSTGRES_DB='tugas-1-ppl-praktikum'
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@database:5432/${POSTGRES_DB}"
DIRECT_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@database:5432/${POSTGRES_DB}"
```

### 2. Run with Docker

All commands must be run from the **project root**.

**Development:**
```bash
docker compose -f ./docker/dev/docker-compose.yml up --build
```

**Production:**
```bash
docker compose -f ./docker/prod/docker-compose.yml up --build
```

## References

- [Next.js Production Dockerfile](https://github.com/kristiyan-velkov/nextjs-prod-dockerfile/blob/main/Dockerfile.standalone) — reference for Docker setup