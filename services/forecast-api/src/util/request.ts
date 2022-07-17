import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestConfig extends AxiosRequestConfig { }
export interface Response<T = any> extends AxiosResponse<T> { }

export const Request = (request = axios) => {
    const service = { get, isRequestError }

    function get<T>(url: string, config: RequestConfig = {}): Promise<Response<T>> {
        return request.get<T, Response<T>>(url, config);
    }

    function isRequestError(error: AxiosError): boolean {
        return !!(error.response && error.response.status)
    }
    return service;
}
export default Request;


