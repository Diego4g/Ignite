import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase"

let createStatementUseCase: CreateStatementUseCase;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Create Statement", () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryStatementsRepository = new InMemoryStatementsRepository()
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository)
  })

  it("should be able create a new Statement", async () => {

    const user = await inMemoryUsersRepository.create({
      email: "test@test.com",
      name: "test statement",
      password: "test231"
    })


    const statement = await createStatementUseCase.execute({
      user_id: user.id,
      amount: 100,
      description: "test create statement",
      type: null
    })

    console.log(statement)

    expect(statement).toHaveProperty("id")
  })
})
