# High Performance OMS

Distributed, event-driven high performance order management system built to demonstrate load leveling, idempotency, and distributed sagas under extreme pressure. This system is designed to handle upto 5000 transactions per second on AWS using non-blocking, asynchronous architecture.

## Workspace Architecture

This project uses a monorepo structure managed by pnpm workspaces and Turborepo. This allows for high-velocity development, shared type-safe contracts, and optimized build caching.

```
.
├── apps/
│   ├── @oms/auth-service       # JWT issuance and identity (Fastify)
│   ├── @oms/order-service      # Order ingestion and validation
│   ├── @oms/inventory-service  # Stock management
│   ├── @oms/payment-service    # Payment simulation
│   └── @oms/workers/           # SQS Consumers for background processing
├── packages/
│   ├── @oms/contracts          # Zod schemas and shared SQS message types
│   ├── @oms/logger             # High-performance logging (Pino)
│   ├── @oms/observability      # OpenTelemetry and tracing setup
│   ├── @oms/redis              # Atomic inventory counters and idempotency
│   └── @oms/database           # DynamoDB Table Design utilities
├── turbo.json                  # Build pipeline orchestration
└── pnpm-workspace.yaml         # Workspace definitions
```

## System Architecture

The system follows a Producer-Consumer pattern to ensure non-blocking I/O and traffic absorption during spikes.

![HLD](./assets/high-level-design.png)

### Core Components

| Component             | Details                                                           |
| --------------------- | ----------------------------------------------------------------- |
| **Traffic Generator** | `k6` to simulate 3k–5k concurrent virtual users                   |
| **Producer**          | Microservice that validates order request and batch them into SQS |
| **Message Bus**       | Amazon SQS to absorb traffic spikes                               |
| **Consumer(Worker)**  | Scalable workers processing messages in batches                   |
| **Database**          | DynamoDB for persistence                                          |
| **Cache**             | Redis based cache for idempotency check and atomic decrements     |
| **Observability**     | OpenTelementry for distributed tracing                            |

## Tech Stack

| Layer         | Technology                                 |
| ------------- | ------------------------------------------ |
| Monorepo      | pnpm, Turborepo                            |
| Runtime       | Node.js                                    |
| Framework     | Fastify                                    |
| Infra         | AWS                                        |
| Testing       | Vitest(Unit/Integration), k6(Load Testing) |
| Observability | Prometheus, Grafana, OpenTelementry        |
