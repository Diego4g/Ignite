import { compare } from "bcrypt";
import { sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest{
    email: string,
    password: string,
}

interface IResponse{
    user:{
        name: string,
        email: string,
    };
    token: string,
}

@injectable()
class AuthenticateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({email, password}: IRequest): Promise<IResponse>{
        // Usuario existe?

        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError("Email or passowrd incorrect");
        }
        // Senha esta correta?
        const passorwdMatch = await compare(password, user.password);

        if(!passorwdMatch){
            throw new AppError("Email or passowrd incorrect");
        }
        // Gerar json webtoken
        const token = sign({},"09bc7047827eddf304f5cbf40b5bb859",{
            subject: user.id,
            expiresIn: "1d" 
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }
        return tokenReturn
        
    }
}

export { AuthenticateUserUseCase }