// import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
// import 'source-map-support/register'
// import * as middy from 'middy'
// import { cors } from 'middy/middlewares'
// import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
// // import { getUserId } from '../utils';
// import {createToDo} from "../../businessLogic/ToDo"

//  middy(
//   export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//     // const newTodo: CreateTodoRequest = JSON.parse(event.body)
//     // TODO: Implement creating a new TODO item
//     console.log("Event is processing ", event);
//     const authorization = event.headers.Authorization;
//     const split = authorization.split(' ');
//     const jwtToken = split[1];

//     const newTodo: CreateTodoRequest = JSON.parse(event.body);
//     const toDoItem = await createToDo(newTodo, jwtToken);

//     return {
//         statusCode: 201,
//         // headers: {
//         //     "Access-Control-Allow-Origin": "*",
//         // },
//         body: JSON.stringify({
//             "item": toDoItem
//         }),
//     }
//   }
// )

// handler.use(
//   cors({
//     credentials: true
//   })
// )
import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import {CreateTodoRequest} from '../../requests/CreateTodoRequest';
import {createToDo} from "../../businessLogic/ToDo";
import { createLogger } from '../../utils/logger'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Implement creating a new TODO item
    const logger = createLogger('auth');
    
   logger.info('Event is processing ', event);
    // console.log("Event is processing ", event);
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1];

    const newTodo: CreateTodoRequest = JSON.parse(event.body);
    const toDoItem = await createToDo(newTodo, jwtToken);

    return {
        statusCode: 201,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            "item": toDoItem
        }),
    }
};