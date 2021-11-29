import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { GetBalanceUseCase } from "./GetBalanceUseCase"


let getBalanceUseCase: GetBalanceUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;


describe("Get balance", () => {

  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    getBalanceUseCase = new GetBalanceUseCase(inMemoryStatementsRepository, inMemoryUsersRepository)
  });

  it("should be able to show a balance of user", async () => {
    const user = await inMemoryUsersRepository.create({
      email: "test@test123",
      name: "test Balance",
      password: "123"
    });

    const statement = await inMemoryStatementsRepository.create({
      user_id: user.id,
      amount: 100,
      description: "deposito de 100 reais",
      type: null
    })

    const getBalance = await getBalanceUseCase.execute({ user_id: user.id })

    expect(getBalance.statement.length).toBe(1)

  })
})
