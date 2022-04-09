import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { errorResponse } from 'common/api-gateway/utils';
import Logger from '../../../../common/winston-logger';
import { CORS_HEADERS } from '../constants';
import StormGlassService from './service'

const stormGlassService = StormGlassService();

export async function stormGlass(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    console.log(event);
    try {
        const lat = 58.7984;
        const lng = 17.8081;
        const stormGlassPoints = await stormGlassService.fetchPointsNormalized(lat, lng);

        return {
            statusCode: 200,
            body: JSON.stringify(stormGlassPoints),
            headers: { ...CORS_HEADERS }
        };
    } catch (error) {
        return errorResponse(error);
    }
}
