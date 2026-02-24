import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { UsersAlreadyExistsError } from "@/services/errors/users-already-exists-error.js";
import { makeRegisterUserCase } from "@/services/factories/make-register-use-case.js";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUserCase();

    await registerUseCase.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UsersAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
