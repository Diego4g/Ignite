import exp from "constants";
import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Create User", () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
  });

  it("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "test",
      password: "123",
      email: "test@test.com"
    })
    expect(user).toHaveProperty("id")
  })

  it("should not be able to create a user with email already exist", () => {

    expect(async () => {

      await createUserUseCase.execute({
        name: "test2",
        password: "123",
        email: "test2@test.com"
      })

      await createUserUseCase.execute({
        name: "test3",
        password: "123",
        email: "test2@test.com"
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
