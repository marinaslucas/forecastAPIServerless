import StormGlassService from './service';
import * as stormglass_weather_api_response from '../test/fixtures/stormglass_weather.json';
import * as stormglass_weather_normalized from '../test/fixtures/stormglass_weather_normalized.json'
import axios from 'axios';

jest.mock('axios');

describe('StormGlass cliente', () => {

  const mockedAxios = axios as jest.Mocked<typeof axios>;
  it('should return the normalized forecast from the StormGlass service', async () => {
    const lat = -33.792726;
    const lng = 151.289824;

    mockedAxios.get.mockResolvedValue({ data: stormglass_weather_api_response })
    const stormGlassService = StormGlassService(mockedAxios);
    const normalizedPoints = await stormGlassService.fetchPointsNormalized(lat, lng); //array de pontos normalizados
    expect(normalizedPoints).toEqual(stormglass_weather_normalized);
  })
})