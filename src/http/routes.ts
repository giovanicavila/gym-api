import type { FastifyInstance } from "fastify";
import { authenticate } from "./controllers/authenticate.js";
import { register } from "./controllers/register.js";
import { getUserById } from "./controllers/users.js";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.get("/user/:userId", getUserById)
  app.post("/sessions", authenticate);
}
