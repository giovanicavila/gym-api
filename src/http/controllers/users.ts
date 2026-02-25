import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { GetUserProfileUseCase } from "@/services/users/get-user-profile.js";

export async function getUserById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const idSchema = z.object({
    userId: z.string(),
  });

  const { userId } = idSchema.parse(request.params);

  try {
    const userRepository = new PrismaUsersRepository();
    const getUserByIdUseCase = new GetUserProfileUseCase(userRepository);

    const { user } = await getUserByIdUseCase.execute({
      userId,
    });

    return reply.status(200).send({ user });
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      return reply.status(404).send({ message: "User not found" });
    }
  }

  return reply.status(500).send({ message: "Internal server error" });
}
