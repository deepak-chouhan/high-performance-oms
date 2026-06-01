import "dotenv/config";
import Fastify from "fastify";

import { loggerConfig } from "@oms/logger";
import { initMetrics } from "@oms/observability";

const metrics = initMetrics();
const fastify = Fastify({ logger: loggerConfig });

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

fastify.get("/metrics", async (_, reply) => {
  reply.header("Content-Type", metrics.registry.contentType);
  return metrics.registry.metrics();
});

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
