import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}
// private serve para podermos ter acesso ao "this," ao longo de toda a classe

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository) {

    }

    async execute({ name, description }: IRequest): Promise<void> {

        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new AppError("Specification already exists!");
        }

        await this.specificationsRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationUseCase }