import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { RegisterUseCase } from "@/services/register.js";

export async function Register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);

    await registerUseCase.execute({ name, email, password });
  } catch (error) {
    if (error) {
      return reply.status(409).send();
    }
  }

  return reply.status(201).send();
}
