import * as stormglass_weather_api_response from '../test/fixtures/stormglass_weather.json';
import * as stormglass_weather_normalized from '../test/fixtures/stormglass_weather_normalized.json';
import { StormGlassNormalizedPoint } from '../types.ts/stormglassWeatherResponse';
import Request from '../util/request';
import StormGlassService from './service';

const request = Request();
const stormGlassService = StormGlassService(request);

const lat = -33.792726;
const lng = 151.289824;

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe('StormGlassService', () => {
  it('should return the normalized forecast from the StormGlass service', async () => {
    request.get = jest.fn().mockResolvedValue({ data: stormglass_weather_api_response });
    const normalizedPoints: StormGlassNormalizedPoint[] = await stormGlassService.fetchPointsNormalized(lat, lng); //array de pontos normalizados
    expect(normalizedPoints).toEqual(stormglass_weather_normalized);
  });
  it('should exclude incomplete data points', async () => {
    const incompleteResponse = {
      hours: [
        {
          windDirection: {
            noaa: 300
          },
          time: '2020-04-26T00:0:00+00:00'
        }
      ]
    };
    request.get =jest.fn().mockResolvedValue({data: incompleteResponse})
    const response = await stormGlassService.fetchPointsNormalized(lat,lng);
    expect(response).toEqual([])
    // await expect(stormGlassService.fetchPointsNormalized(lat,lng)).rejects.toThrow('Unexpected error when trying to communicate to StormGlass: "Network Error"')
  });
});
