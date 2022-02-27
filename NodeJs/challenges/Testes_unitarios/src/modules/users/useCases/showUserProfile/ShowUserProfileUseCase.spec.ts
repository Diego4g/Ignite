import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";


let inMemoryUsersRepository: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Show info user", () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository);
  })

  it("should be able to show a info of user", async () => {

    const user = await inMemoryUsersRepository.create({
      email: "test@test.com",
      name: "Test info user",
      password: "123",
    });

    const userInfo = await showUserProfileUseCase.execute(user.id)

    expect(userInfo).toEqual(user)

  })

  it("should be not able to show a info of user not exists", async () => {

    expect(async () => {
      await showUserProfileUseCase.execute("test")

    }).rejects.toBeInstanceOf(AppError)
  })
})
