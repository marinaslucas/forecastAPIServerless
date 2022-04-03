import { HttpServiceFactory } from '../../../../common/http-2';
import { config } from '../config';

const HttpInstanceDefault = HttpServiceFactory().create({
    baseURL: config.stormglass.url,
    headers: {
        Authorization: config.stormglass.auth
    },
    timeout: 10000
});

export const StormGlassService = (httpRequest = HttpInstanceDefault) => {
    const stormGlassAPIParams = 'swellDirection%2CswellHeight%2CswellPeriod%2CwaveDirection%2CwaveHeight%2CwindDirection%2CwindSpeed';
    const stormGlassAPISource = 'nooaa'
    const fetchPoints = async (lat: number, lng: number): Promise<{}> => {
        const path = `/weather/point?params=${stormGlassAPIParams}&source=${stormGlassAPISource}&lat=${lat}&lng=${lng}`;
        const response = await httpRequest.get(path);

        return response;
    }
    return { fetchPoints }

}

