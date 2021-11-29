import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase"

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

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
    expect(statement).toHaveProperty("id")
  })

  it("should not be able create a statement with type withdraw if funds is insufficient", () => {

    expect(async () => {
      const user = await inMemoryUsersRepository.create({
        email: "test@test.com",
        name: "test statement",
        password: "test231"
      })

      let type = "withdraw" as OperationType;

      const statement = await createStatementUseCase.execute({
        user_id: user.id,
        amount: 1000,
        description: "test create statement",
        type: type
      })

      console.log(statement)

    }).rejects.toBeInstanceOf(AppError)
  })

})
