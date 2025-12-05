import { Server } from "http";
import { promisify } from "util";

import { env } from "./env";

import Express from "express";
import { appRouter } from "./app";
import cors from "cors";
import bodyParser from "body-parser";

let server: Server;

async function start() {
  const app = Express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(appRouter);

  server = await new Promise<Server>((resolve, reject) => {
    resolve(app.listen({ port: env.PORT, host: "0.0.0.0" }, reject));
  });

  console.log(`API listening on port ${env.PORT}`);
}

async function stop() {
  if (server) {
    await promisify(server.close.bind(server))();
  }
  process.exit(0);
}

const events = ["SIGHUP", "SIGINT", "SIGTERM", "SIGQUIT", "SIGUSR1", "SIGUSR2"];

events.forEach((event) =>
  process.once(event, () => {
    console.log(`Received signal: ${event}, stopping server...`);
    stop();
  }),
);

start().catch((e) => {
  console.error(e);
  stop();
});
