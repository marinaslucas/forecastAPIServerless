import { AxiosRequestConfig } from 'axios';
import Logger from '../../../../common/winston-logger';
import { StormGlassForecastResponse, StormGlassPoint, StormGlassNormalizedPoint } from '../types.ts/stormglassWeatherResponse';
import Request, { RequestConfig } from '../util/request';
import config from '../config';

const stormGlassAPIParams = 'swellDirection%2CswellHeight%2CswellPeriod%2CwaveDirection%2CwaveHeight%2CwindDirection%2CwindSpeed';
const stormGlassAPISource = 'noaa'

export const StormGlassService = (request = Request()) => {
    const fetchPointsNormalized = async (lat: number, lng: number): Promise<StormGlassNormalizedPoint[]> => {
        try {
            Logger.info({ context: 'StormGlassService.fetchPointsNormalized START...', data: { lat: lat, lng: lng } })
            const url = `${config.stormglass.url}/v2/weather/point?params=${stormGlassAPIParams}&source=${stormGlassAPISource}&lat=${lat}&lng=${lng}`;
            const response = await request.get<StormGlassForecastResponse>(url, { headers: { Authorization: config.stormglass.auth } });
            Logger.info({ context: 'StormGlassService.fetchPointsNormalized END.', data: response.data })
            return normalizedResponse(response.data);
        } catch (err) {
            if (request.isRequestError(err)) {
                throw new Error(`Unexpected error returned by the StormGlass service: Error: ${JSON.stringify(err.response.data)} Code: ${err.response.status}`)
            }
            throw new Error(`Unexpected error when trying to communicate to StormGlass: ${err.message}`);
        }
    }
    return { fetchPointsNormalized }
}
export default StormGlassService;

const normalizedResponse = (stormGlassResponse: StormGlassForecastResponse): StormGlassNormalizedPoint[] => {
    Logger.info({ context: 'StormGlassService.fetchPointsNormalized.normalizedReponse START...' })
    const validPoints: StormGlassPoint[] = stormGlassResponse.hours.filter(isPointValid)
    const normalizedPoints = validPoints.map((point: StormGlassPoint): StormGlassNormalizedPoint => {
        return {
            swellDirection: point.swellDirection[stormGlassAPISource],
            swellHeight: point.swellHeight[stormGlassAPISource],
            swellPeriod: point.swellPeriod[stormGlassAPISource],
            time: point.time,
            waveDirection: point.waveDirection[stormGlassAPISource],
            waveHeight: point.waveHeight[stormGlassAPISource],
            windDirection: point.windDirection[stormGlassAPISource],
            windSpeed: point.windSpeed[stormGlassAPISource]
        }
    })
    Logger.info({ context: 'StormGlassService.fetchPointsNormalized.normalizedReponse END...', data: normalizedPoints })
    return normalizedPoints;
}

const isPointValid = (point: Partial<StormGlassPoint>): boolean => {
    return !!(
        point.time &&
        point.swellDirection?.[stormGlassAPISource] &&
        point.swellHeight?.[stormGlassAPISource] &&
        point.swellPeriod?.[stormGlassAPISource] &&
        point.waveDirection?.[stormGlassAPISource] &&
        point.waveHeight?.[stormGlassAPISource] &&
        point.windDirection?.[stormGlassAPISource] &&
        point.windSpeed?.[stormGlassAPISource]
    )
}




