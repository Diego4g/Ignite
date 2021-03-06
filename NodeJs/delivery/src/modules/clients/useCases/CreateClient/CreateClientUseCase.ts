import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";


interface ICreateClient {
    username: string;
    password: string
}

export class CreateClientUseCase {

    async execute({ password, username }: ICreateClient) {

        const clientExists = await prisma.clients.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive", //ignora se tem maiusculo ou minusculo
                },
            },
        })

        if (clientExists) {
            throw new Error("Client already exists");
        }

        const hashPasswod = await hash(password, 10);

        const client = await prisma.clients.create({
            data: {
                username,
                password: hashPasswod,
            }
        })

        return client;

    }
}