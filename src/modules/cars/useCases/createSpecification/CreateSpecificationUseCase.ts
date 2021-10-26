import { ISpecificationsRepository } from "../../repositories/implementations/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}
// private serve para podermos ter acesso ao "this," ao longo de toda a classe
class CreateSpecificationUseCase {
    constructor(private specificationsRepository: ISpecificationsRepository) {

    }
    execute({ name, description }: IRequest): void {

        const specificationAlreadyExists = this.specificationsRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error("Specification already exists!");
        }
        this.specificationsRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationUseCase }