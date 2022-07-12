import StormGlassService from './service';
import { HttpServiceFactory } from '../../../../common/http-2';
import * as stormglass_weather_api_response from '../test/fixtures/stormglass_weather.json';
import * as stormglass_weather_normalized from '../test/fixtures/stormglass_weather_normalized.json'

const httpServiceFactory = HttpServiceFactory();
const httpInstanceDefault = httpServiceFactory.create({
  baseURL: 'www.teste.com.br',
  headers: {
    Authorization: 'authorization'
  },
  timeout: 10000
});

describe('StormGlass cliente', () => {
  it('should return the normalized forecast from the StormGlass service', async () => {
    const lat = -33.792726;
    const lng = 151.289824;
    httpInstanceDefault.get = jest.fn().mockResolvedValue({ data: stormglass_weather_api_response })
    const stormGlassService = StormGlassService(httpInstanceDefault);
    const normalizedPoints = await stormGlassService.fetchPointsNormalized(lat, lng); //array de pontos normalizados
    expect(normalizedPoints).toEqual(stormglass_weather_normalized);
  })
})