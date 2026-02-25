import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-checkins-repository.js";
import { CheckInUseCase } from "./check-in.js";

let checkiInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("check-in use case", () => {
  beforeEach(() => {
    checkiInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkiInsRepository);
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-id",
      gymId: "gym-id",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
