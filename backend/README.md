<p align="center"> <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a> </p>

<h1 align="center">TaskFlow API</h1>

<p align="center"> The robust, high-performance backend powering the TaskFlow platform. <br /> Built with <strong>NestJS</strong>, <strong>Fastify</strong>, and <strong>GraphQL</strong>. </p>

<p align="center"> <img src="https://img.shields.io/badge/NestJS-10.x-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" /> <img src="https://img.shields.io/badge/GraphQL-Mercurius-E10098?style=for-the-badge&logo=graphql&logoColor=white" alt="GraphQL" /> <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" /> <img src="https://img.shields.io/badge/Coverage-55%25-brightgreen?style=for-the-badge" alt="Coverage" /> </p>

<p align="center"> <a href="#architecture">Architecture</a> • <a href="#getting-started">Getting Started</a> • <a href="#testing">Testing</a> • <a href="#documentation">Documentation</a> </p>

### Architecture

TaskFlow API follows a **Modular Monolith architecture** designed for scalability and maintainability.

It leverages the "Platform Agnostic" capability of NestJS by using the **Fastify Adapter** for maximum performance (up to 2x faster than Express).

### Request Lifecycle

```mermaid
graph TD
    Client[("Client")]
    
    subgraph "Backend Core - NestJS"
        Gateway["Fastify Adapter"]
        Guard["Auth & Workspace Guards"]
        Interceptor["DTO Validation Pipe"]
        
        subgraph "GraphQL Layer"
            Resolver["Resolvers"]
            FieldResolver["Field Resolvers"]
        end
        
        Service["Services - Business Logic"]
        Prisma["Prisma Client"]
    end
    
    DB[("PostgresQL")]

    Client --> Gateway
    Gateway --> Guard
    Guard --> Interceptor
    Interceptor --> Resolver
    
    Resolver -- "Main Data" --> Service
    Resolver -. "Nested Data" .-> FieldResolver
    
    Service --> Prisma
    FieldResolver --> Prisma
    Prisma --> DB
```

### Key Design Patterns

- **Schema First GraphQL**: Type definitions (.graphql files) are the single source of truth. TypeScript definitions are auto-generated.

- **Hybrid Loading Strategy**: We optimize performance by avoiding massive SQL joins. The Main Resolver fetches the core entity, while Field Resolvers (@ResolveField) lazily fetch related data (Boards, Lists, Cards) only when requested by the client.

- **Errors as Data**: Mutations do not throw generic exceptions. They return Union Types (e.g., RegisterSuccess | RegisterError) allowing the frontend to handle business errors (like "Email taken") as strongly-typed data.

- **Secure Authentication**: Implementation of HttpOnly Cookies preventing XSS attacks on JWT tokens.

## 🛠️ Tech Stack

| Component | Technology | Benefit |
| :--- | :--- | :--- |
| **Framework** | **NestJS** | Strict architecture, Dependency Injection, Decorators. |
| **Engine** | **Fastify** | High performance, low overhead (up to 2x faster than Express). |
| **API** | **GraphQL (Mercurius)** | Efficient Data Fetching, Type Safety, Playground. |
| **Database** | **PostgreSQL + Prisma** | Reliability, Type-safe queries, Migrations. |
| **Testing** | **Jest** | Unit and Integration testing with mocking. |
| **Doc** | **Compodoc** | Visual documentation of the modules graph. |

### Getting Started

#### Prerequisites

- **Node.js** (v18 or later)

- **Docker** (for the local Database)

- **npm or pnpm**

### Installation

#### Clone the repository

```bash
git clone git@github.com:EliasJHL/TaskFlow.git
cd taskflow/backend
```

#### Install dependencies 

```bash
npm install
```

#### Environment Setup
Create a .env file in the root directory: 

```properties
DATABASE_URL="postgresql://user:password@localhost:5432/taskflow_db?schema=public" 
JWT_SECRET="your_super_secret_key_change_me" 
COOKIE_SECRET="another_secret_for_cookies"
NODE_ENV="development"
PORT=3000
```

#### Database Setup

Start the database container and apply migrations:

```bash
# 1. Start Docker container
docker-compose up -d db

# 2. Push schema to DB (Dev mode)
npx prisma db push

# 3. Generate Prisma Client (Vital for TypeScript)
npx prisma generate 
```

#### Running the App

```bash
npm run start:dev
```

Once started, the GraphQL Playground is available at: 👉 http://localhost:3000/graphiql

### Testing
We maintain a high standard of **code quality** with 100% coverage on critical paths (Services & Resolvers).

#### Unit Tests

Tests are located next to the files they test (*.spec.ts).

```bash
# Run all unit tests
npm run test

# Run tests in watch mode (TDD)
npm run test:watch
```

#### Coverage Report

To generate the coverage report and verify system integrity:

```bash
npm run test:cov
```

### Documentation
#### Code Architecture (Compodoc)

Generate a static website exploring the modules, services, and dependency graph.

```bash
npm run doc
```
Then open http://localhost:8080 in your browser.

#### API Documentation

The API is self-documented via the GraphQL Schema. You can inspect the schema and test queries directly in the **Playground at /graphiql**.

**Example Query:**
```graphql
query GetMyDashboard {
    workspaces {
        name
        is_pinned
        boards {
            title
            color
        }
    }
}
```

#### Project Structure
```text
src/ 
├── auth/ # Authentication (Login, Register, Guards) 
├── board/ # Board management (Kanban logic) 
├── list/ # List management (Ordering, Creation) 
├── card/ # Card management (Content, Moving) 
├── label/ # Label management 
├── workspace/ # Workspace logic (The root entity) 
├── common/ # Shared Guards, Decorators, and Utilities 
├── prisma/ # Prisma Module & Service 
└── graphql/ # Generated TypeScript definitions
```
