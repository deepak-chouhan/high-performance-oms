# High Performance OMS

Distributed, event-driven high performance order management system built to demonstrate load leveling, idempotency, and distributed sagas under extreme pressure. This system is designed to handle upto 5000 transactions per second on AWS.

## Repositories

This project is split across multiple repositories to ensure independent scalability and deployment isolation.

- `high-performance-oms`: The primary repo that contains Infrastructure as Code(IaC), performance test suites, and global documentation.
- `hp-oms-order-service`: The core service to handle orders.
- `hp-oms-inventory-service`: The inventory service to handle consistent stock.
- `hp-oms-payment-service`: The payment service to simulate real-world payment latencies and failures.
- `hp-oms-auth-service`: JWT-based authentication service.

## System Architecture

The system follows an Asynchronous pattern to ensure the non-blocking I/O.

![HLD](./assets//hld.svg)

### Core Components

| Component                  | Details                                                           |
| -------------------------- | ----------------------------------------------------------------- |
| **Traffic Generator**      | `k6` to simulate 3k–5k concurrent virtual users                   |
| **Order Producer**         | Microservice that validates order request and batch them into SQS |
| **Message Bus**            | Amazon SQS to absorb traffic spikes                               |
| **Order Consumer(Worker)** | Scalable workers processing messages in batches                   |
| **Database**               | DynamoDB for consistent write                                     |
| **Cache**                  | Redis based cache for idempotency check and inventory counters    |
| **Observability**          | OpenTelementry for distributed tracing                            |

## Tech Stack

| Layer         | Technology                          |
| ------------- | ----------------------------------- |
| Runtime       | Node.js                             |
| Framework     | Fastify                             |
| Infra         | AWS                                 |
| Load Testing  | k6                                  |
| Observability | Prometheus, Grafana, OpenTelementry |

