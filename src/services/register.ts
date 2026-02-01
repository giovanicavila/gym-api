import { hash } from "bcryptjs";
import type { UsersRepository } from "@/repositories/users-repository.js";
import { UsersAlreadyExistsError } from "./errors/users-already-exists-error.js";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UsersAlreadyExistsError();
    } else {
      // TODO: we should log to an external tool like DataDog, NewRelic, Sentry, etc.
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });
  }
}
