import { prisma } from "../../../../../database/prismaClient";

interface IUpdateDeliveryman {
    id_delivery: string;
    id_deliveryman: string;
}

export class UpdateDeliverymanUseCase {

    async execute({ id_deliveryman, id_delivery }: IUpdateDeliveryman) {

        const result = await prisma.deliveries.update({
            where: {
                id: id_delivery,
            },

            data: {
                id_deliveryman,
            }
        })

        return result

    }
}