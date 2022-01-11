import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateDeliveryman {
    username: string,
    password: string,
}

export class CreateDeliverymanUseCase {

    async execute({ password, username }: ICreateDeliveryman) {

        const deliverymanExists = await prisma.deliveryman.findFirst({
            where: {
                username: {
                    mode: "insensitive" //ignora se tem maiusculo ou minusculo
                }
            }
        })

        if (deliverymanExists) {
            throw new Error("Deliveryman already exists");
        }

        const hashPasswod = await hash(password, 10);

        const deliveryman = await prisma.deliveryman.create({
            data: {
                username,
                password: hashPasswod,
            }
        })

        return deliveryman;
    }
}