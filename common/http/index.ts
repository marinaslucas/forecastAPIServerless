import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import logger from '../logger';

function hideSensitiveData(config: AxiosRequestConfig): AxiosRequestConfig {
  const configSensitiveDataHided: AxiosRequestConfig = JSON.parse(JSON.stringify(config));
  if (configSensitiveDataHided.auth) {
    configSensitiveDataHided.auth.username = '***';
    configSensitiveDataHided.auth.password = '***';
  }

  return configSensitiveDataHided;
}

export default async function http<T = unknown>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  const configSensitiveDataHided = hideSensitiveData(config);
  try {
    const endLog = logger.startLog({ context: 'http-request', data: { request: configSensitiveDataHided } }, 'pending');
    const response = await axios(config);
    const logPayload = endLog();
    logPayload.data.response = { statusCode: response.status, body: response.data };
    logger.startLog({ ...logPayload, context: 'http-request' }, 'info');
    return response;
  } catch (error) {
    logger.startLog(
      {
        context: 'http-request',
        data: {
          request: configSensitiveDataHided,
          response: {
            statusCode: error.response.status,
            error: error.message
          }
        }
      },
      'fail'
    );
    throw error;
  }
}
