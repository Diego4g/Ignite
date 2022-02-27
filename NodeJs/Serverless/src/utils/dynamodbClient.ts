import { DynamoDB } from "aws-sdk";

const options = {
    region: "localhost",
    endpoint: "http://localhost:8000",
}

const isOffline = () => {
    return process.env.IS_OFFILINE; // quanto utilizamos o serverless offiline esta váriavel ja é true por padrão
}

export const document = isOffline() ? new DynamoDB.DocumentClient(options) : new DynamoDB.DocumentClient(); // se estiver offline, utilizar o dynamo local, se não estiver local, utilizar o dynamo da aws