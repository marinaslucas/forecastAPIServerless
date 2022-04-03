import HttpErrors from 'http-errors';
import Logger from '../winston-logger';
import { ApiGatewayResponseI, IApiGatewayResponseService } from './types';

export const errorResponse = (error: Error, context = 'ApiGatewayErrorResponse'): ApiGatewayResponseI => {
  if (HttpErrors.isHttpError(error)) {
    Logger.warn(JSON.stringify({ context, data: error }));
    return { statusCode: error.statusCode, body: JSON.stringify({ message: error.message }) };
  }
  Logger.error(JSON.stringify({ context, data: error.message }));
  return { statusCode: 500, body: JSON.stringify({ message: 'Internal Server Error' }) };
};

export const ApiGatewayResponseServiceFactory = (): IApiGatewayResponseService => {
  const buildResponseObject = (statusCode: number, data?): ApiGatewayResponseI => ({
    statusCode,
    body: data ? JSON.stringify(data) : data
  });

  return {
    ok: (data) => buildResponseObject(200, data),
    created: (data) => buildResponseObject(201, data),
    accepted: () => buildResponseObject(202),
    noContent: () => buildResponseObject(204)
  };
};

export type ApiGatewayResponse = ApiGatewayResponseI;
