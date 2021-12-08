import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carRepository: ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const minium_daily = 1;
        const rental = await this.rentalsRepository.findByID(id);
        const car = await this.carRepository.findById(rental.car_id);

        if (!rental) {
            throw new AppError("Rental does not exists!");
        }

        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.dateNow()
        );

        if (daily <= 0) {
            daily = minium_daily;
        }

        const delay = this.dateProvider.compareInDays(
            dateNow,
            rental.start_date
        );

        let total = 0;

        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carRepository.updateAvailabe(car.id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase };
