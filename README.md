# TaskFlow

A modern, open-source project management platform for teams.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/eliasjhl/taskflow)](https://github.com/yourusername/taskflow)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## Overview

TaskFlow is a collaborative project management tool built with TypeScript, React, and GraphQL. It provides a flexible Kanban-style workflow for organizing teams, workspaces, boards, and tasks with both cloud-hosted and self-hosted deployment options.

**Key Features:**
- Role-based access control (admin, member, viewer)
- Real-time collaboration
- Rich card management with comments, labels, and attachments
- Dark and light mode support
- Self-hosted or cloud deployment

## Demo

Try the hosted version at [taskflow.app](https://taskflow-eliasjhl-projects.app) or deploy your own instance in under 5 minutes.

## Getting Started

### Prerequisites

- Node.js 20+
- Docker and Docker Compose
- PostgreSQL 16+ (or use Docker)

### Self-Hosted Installation

Clone the repository and start all services with Docker Compose:

```
git clone https://github.com/yourusername/taskflow.git
cd taskflow
cp .env.example .env
docker-compose up -d
```


The application will be available at `http://localhost:5173`.

### Development

Install dependencies:

```
npm install
```

## Architecture

TaskFlow uses a monorepo structure with the following main components:

```
taskflow/
├── apps/
│ ├── backend/ # Fastify GraphQL API
│ └── frontend/ # React application
├── packages/
│ └── shared-types/ # Shared TypeScript definitions
└── infrastructure/ # Docker and Kubernetes configs
```


## Technology Stack

**Frontend**
- React 18
- Tailwind CSS
- Zustand
- Apollo Client

**Backend**
- Node.js
- Fastify
- Mercurius (GraphQL)
- Prisma ORM
- BullMQ

**Infrastructure**
- PostgreSQL
- Redis
- MinIO (S3-compatible storage)
- Docker

## Self-hosted deployement

. . .




