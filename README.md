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

# Postman Collection

[PostMan Collection](https://documenter.getpostman.com/view/38554123/2sBXietaKK)
PostMan is a bit messy (only for testing)

## Contributing

We welcome contributions to help improve this template! Please take a look at our [Contributing Guidelines](CONTRIBUTING.md) for more details on how to get started and the submission process.
