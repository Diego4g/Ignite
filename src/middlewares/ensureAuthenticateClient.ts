import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string
}


export async function ensureAuthenticateClient(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            message: "Token missing",
        })
    }

    // Bearer 9594d8sa4dsa5asd5

    const [, token] = authHeader.split(" ");

    // [0] = Bearer; 
    // [1] = 9594d8sa4dsa5asd5

    try {
        const { sub } = verify(token, "242ff5fb634b1fb7e435b20f666bdd2d") as IPayload;

        request.id_client = sub;

        return next();

    } catch (err) {
        return response.status(401).json({
            message: "Invalid token!",

        })
    }

}