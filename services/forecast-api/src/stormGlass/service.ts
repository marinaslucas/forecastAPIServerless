import axios, { AxiosStatic } from 'axios';
import { config } from '../config';
import { StormGlassForecastResponse, StormGlassPoint, StormGlassNormalizedPoint } from '../types.ts/stormglassWeatherResponse';

const stormGlassAPIParams = 'swellDirection%2CswellHeight%2CswellPeriod%2CwaveDirection%2CwaveHeight%2CwindDirection%2CwindSpeed';
const stormGlassAPISource = 'noaa'

export const StormGlassService = (httpRequest: AxiosStatic = axios) => {
    const fetchPointsNormalized = async (lat: number, lng: number): Promise<StormGlassNormalizedPoint[]> => {
        const path = `/v2/weather/point?params=${stormGlassAPIParams}&source=${stormGlassAPISource}&lat=${lat}&lng=${lng}`;
        const response = await httpRequest.get<StormGlassForecastResponse>(config.stormglass.url + path, {
            headers: {
                Authorization: config.stormglass.auth
            }
        });
        console.log(response.data)
        return normalizedResponse(response.data);
    }
    return { fetchPointsNormalized }
}
export default StormGlassService;

const normalizedResponse = (stormGlassResponse: StormGlassForecastResponse): StormGlassNormalizedPoint[] => {
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




