import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found.js";
import { GetUserProfileUseCase } from "./get-user-profile.js";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("GetUserProfile use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("it should be able to get user profile", async () => {
    const user = await usersRepository.create({
      name: "john doe",
      email: "johndoe@gmail.com",
      password_hash: await hash("123456", 6),
    });

    await sut.execute({
      userId: user.id,
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("it should not be able to get user profile with wrong userId", async () => {
    await expect(
      sut.execute({
        userId: "invalid-user-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
