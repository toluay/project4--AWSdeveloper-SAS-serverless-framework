// import 'source-map-support/register'

// import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda';
// import {getTodosForUser} from "../../businessLogic/ToDo";

// export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//     // TODO: Get all TODO items for a current user
//     console.log("Event is processing ", event);
//     const authorization = event.headers.Authorization;
//     const split = authorization.split(' ');
//     const jwtToken = split[1];

//     const toDos = await getTodosForUser(jwtToken);

//     return {
//         statusCode: 200,
//         headers: {
//             "Access-Control-Allow-Origin": "*",
//         },
//         body: JSON.stringify({
//             "items": toDos,
//         }),
//     }
// };
import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda';
import {getAllToDo} from "../../businessLogic/ToDo";
import { createLogger } from '../../utils/logger'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Get all TODO items for a current user
    // console.log("Event is processing ", event);

    const logger = createLogger('auth');
    
    logger.info('Event is processing', event);

    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1];

    const toDos = await getAllToDo(jwtToken);

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            "items": toDos,
        }),
    }
};