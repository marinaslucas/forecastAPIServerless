import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Logger from '../winston-logger';

export const HttpServiceFactory = (http = Axios) => {
  const configInterceptors = (httpClient: AxiosInstance): AxiosInstance => {
    // Add a request interceptor
    httpClient.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    httpClient.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        Logger.info(
          JSON.stringify({
            context: 'HttpService-Error',
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers
          })
        );

        return Promise.reject(error);
      }
    );
    return httpClient;
  };
  return {
    create: (config?: AxiosRequestConfig) => {
      const HttpInstanceDefault = http.create(config);
      const HttpInstanceDefaultWithInterceptors = configInterceptors(HttpInstanceDefault);
      return HttpInstanceDefaultWithInterceptors;
    }
  };
};
