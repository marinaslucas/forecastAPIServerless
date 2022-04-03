export const config = {
    stage: process.env.STAGE,
    stormglass: {
        url: process.env.STORMGLASS_API_URL,
        auth: process.env.STORMGLASS_API_AUTH
    }
}

export default config;