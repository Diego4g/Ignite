import { Request, Response, NextFunction } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { createClient } from "redis";

import { AppError } from "@shared/errors/AppError";

const redisClient = createClient({
    legacyMode: true,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});

redisClient.connect();

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rateLimiter",
    points: 5, // 10 requests
    duration: 5, // per 5 second by IP
});

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {
        await limiter.consume(request.ip);

        return next();
    } catch (err) {
        throw new AppError("To many requests", 429);
    }
}
