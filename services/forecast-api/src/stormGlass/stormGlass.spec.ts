import StormGlassService from './service';
import * as stormglass_weather_api_response from '../test/fixtures/stormglass_weather.json';
import * as stormglass_weather_normalized from '../test/fixtures/stormglass_weather_normalized.json'
import Request from '../util/request';

const request = Request();
const stormGlassService = StormGlassService(request);

// beforeEach(() => {
//   jest.clearAllMocks();
//   jest.resetAllMocks();
// });

describe('StormGlassService', () => {
  it('should return the normalized forecast from the StormGlass service', async () => {
    const lat = -33.792726;
    const lng = 151.289824;
    request.get = jest.fn().mockResolvedValue({ data: stormglass_weather_api_response })
    const normalizedPoints = await stormGlassService.fetchPointsNormalized(lat, lng); //array de pontos normalizados
    expect(normalizedPoints).toEqual(stormglass_weather_normalized);
  })
})