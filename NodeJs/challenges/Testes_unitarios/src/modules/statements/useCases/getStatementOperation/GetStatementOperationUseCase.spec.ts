import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase"
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository"
import { AppError } from "../../../../shared/errors/AppError";

let getStatementOperationUseCase: GetStatementOperationUseCase;
let inMemoryStatementsRepositry: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Get statement operation", () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepositry = new InMemoryStatementsRepository()
    getStatementOperationUseCase = new GetStatementOperationUseCase(inMemoryUsersRepository, inMemoryStatementsRepositry)
  })

  it("should be able to search a statement for id", async () => {

    const user = await inMemoryUsersRepository.create({
      email: "testSearchStatement@test",
      name: "testSearchStatement",
      password: "SearchStatement"
    })

    const statement = await inMemoryStatementsRepositry.create({
      amount: 100,
      description: "Test Search",
      user_id: user.id,
      type: null
    })

    const searchStatement = await getStatementOperationUseCase.execute({ user_id: user.id, statement_id: statement.id })

    expect(searchStatement).toEqual(statement)
  })

  it("should be not able to search a statement not exists", () => {

    expect(async () => {
      const user = await inMemoryUsersRepository.create({
        email: "testSearchStatement@test",
        name: "testSearchStatement",
        password: "SearchStatement"
      })

      await getStatementOperationUseCase.execute({ user_id: user.id, statement_id: "test_error_id" })
    }).rejects.toBeInstanceOf(AppError)

  })

})
