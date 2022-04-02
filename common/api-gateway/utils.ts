import HttpErrors from 'http-errors';
import Logger from '../winston-logger';

export type ApiGatewayResponse = { statusCode: number; body: string };

export const errorResponse = (error: Error, context = 'ApiGatewayErrorResponse'): ApiGatewayResponse => {
  if (HttpErrors.isHttpError(error)) {
    Logger.warn({ context, data: error });
    return { statusCode: error.statusCode, body: JSON.stringify({ message: error.message }) };
  }
  Logger.error({ context, data: error.message });
  return { statusCode: 500, body: JSON.stringify({ message: 'Internal Server Error' }) };
};
