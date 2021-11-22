import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction): Promise<void> {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    //Bearer 8od56a44das45d6ad456a: assim q vem o token

    const [, token] = authHeader.split(" ");
    //O array vai ser dividido pelo espaço ou seja:
    //[0] = Bearer
    //[token] = 8od56a44das45d6ad456a

    // Quando a função verify atesta que o token é invalido, ela lança uma excessao, e por isso utilizamos o try catch aqui
    try {
        const { sub: user_id } = verify(token, "09bc7047827eddf304f5cbf40b5bb859") as IPayload; // A função verify recebe o token e o código secreto que a gente gerou no md5 hash generator
        // note que o verify retorna 3 atributos: 
        //iat: quando o token foi criado
        //exp: quando o token expira
        //sub: que é o id
        //Porem fazendo apenas a desestruturação const { sub } = verify... nao é possivel, entao forçamos isso com a interface IPayload

        const usersRepository = new UsersRepository();

        const user = usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not exists!", 401);
        }

        request.user = {
            id: user_id
        }
        next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }
}