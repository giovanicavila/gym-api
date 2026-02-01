import fastify from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma.js";

export const app = fastify();

app.post("/users", async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  const {name, email, password} = registerBodySchema.parse(request.body);

  await prisma.user.create({
    data: {
      name, 
      email,
      password_hash: password,
    }
  })

  return reply.status(201).send();
})

app.get("/test-connection", async (_, reply) => {
  try {
    await prisma.$connect();
    return reply.send({ status: "connected", message: "Successfully connected to MongoDB" });
  } catch (error) {
    return reply.status(500).send({
      status: "error",
      message: "Failed to connect to database",
      error: error instanceof Error ? error.message : String(error),
    });
  }
})