export interface StormGlassPointSource {
    [key: string]: number
}

export interface StormGlassPoint {
    swellDirection: StormGlassPointSource,
    swellHeight: StormGlassPointSource,
    swellPeriod: StormGlassPointSource,
    time: string,
    waveDirection: StormGlassPointSource,
    waveHeight: StormGlassPointSource,
    windDirection: StormGlassPointSource,
    windSpeed: StormGlassPointSource
}

export interface StormGlassForecastResponse {
    hours: StormGlassPoint[]
}

export interface StormGlassNormalizedPoint {
    swellDirection: number;
    swellHeight: number;
    swellPeriod: number;
    time: string;
    waveDirection: number;
    waveHeight: number;
    windDirection: number;
    windSpeed: number;
}