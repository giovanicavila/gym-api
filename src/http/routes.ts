import type { FastifyInstance } from "fastify";
import { Register } from "./controllers/register.js";

export async function appRoutes(app: FastifyInstance){
    app.post("/users", Register);
}