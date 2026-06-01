import {
  Registry,
  collectDefaultMetrics,
  Counter,
  Histogram,
} from "prom-client";

export function initMetrics() {
  const registry = new Registry();
  collectDefaultMetrics({ register: registry });

  const orderCounter = new Counter({
    name: "orders_total",
    help: "Total orders placed",
    labelNames: ["status"] as const,
    registers: [registry],
  });

  const orderDuration = new Histogram({
    name: "order_duration_ms",
    help: "Order placement duration in ms",
    buckets: [5, 10, 25, 50, 100, 250, 500, 1000],
    labelNames: ["endpoint"] as const,
    registers: [registry],
  });

  const paymentFailureCounter = new Counter({
    name: "payment_failures_total",
    help: "Payment failures by code",
    labelNames: ["failure_code"] as const,
    registers: [registry],
  });

  return { registry, orderCounter, orderDuration, paymentFailureCounter };
}

export type Metrics = ReturnType<typeof initMetrics>;
