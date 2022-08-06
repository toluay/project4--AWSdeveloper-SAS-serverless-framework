import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getTodosForUser as getTodosForUser } from '../../businessLogic/ToDo'
// import { getUserId } from '../utils';

// TODO: Get all TODO items for a current user

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    console.log("Event is processing ", event);
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1];
    const todos = await getTodosForUser(jwtToken);

    return {
        statusCode: 200,
        // headers: {
        //     "Access-Control-Allow-Origin": "*",
        // },
        body: JSON.stringify({
            "items": todos,
        }),
    }
  });

handler.use(
  cors({
    credentials: true
  })
)
