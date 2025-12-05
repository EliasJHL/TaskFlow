# TaskFlow - /!\ This project is in developement

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

## 🛠️ Tech Stack & Credits

This project stands on the shoulders of giants. Special thanks to the open-source community.

**Core Stack:**
- [NestJS](https://nestjs.com/) (MIT) - Backend Framework
- [React](https://react.dev/) (MIT) - Frontend Library
- [Prisma](https://www.prisma.io/) (Apache 2.0) - ORM

**Key Libraries:**
- **[tldraw](https://github.com/tldraw/tldraw)** (Apache 2.0) - The amazing whiteboard engine used for the infinite canvas.
- **[shadcn/ui](https://ui.shadcn.com/)** (MIT) - UI Components.
- **[dnd-kit](https://dndkit.com/)** (MIT) - Drag and Drop primitives.

## Demo

Try the hosted version at [Not ready yet] or deploy your own instance in under 5 minutes.

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
- Neon PostgreSQL - Self solution coming soon
- Redis
- AWS S3 Cloud storage - Self solution coming soon
- Docker

## Self-hosted deployement

. . .




