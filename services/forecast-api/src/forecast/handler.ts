import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { errorResponse } from 'common/api-gateway/utils';
import Logger from '../../../../common/winston-logger';
import { CORS_HEADERS } from '../constants';
import { ForecastService } from './service';

const forecastService = ForecastService();

export async function getForecast(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  try {
    console.log(event);
    const forecast = await forecastService.getForecastForLoggedUser();
    Logger.info(JSON.stringify(forecast));
    return {
      statusCode: 200,
      body: JSON.stringify(forecast),
      headers: { ...CORS_HEADERS }
    };
  } catch (error) {
    return errorResponse(error);
  }
}
