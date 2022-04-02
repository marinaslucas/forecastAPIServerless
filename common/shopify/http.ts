import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import Logger from '../logger';
import {
  CreateProductMetafieldResponse,
  GetAllProductsPayload,
  GetAllProductsResponse,
  GetAllProductsShopifyResponse,
  GetCollectionProductsPayload,
  GetCollectionProductsResponse,
  GetDetailedProductResponse,
  GetOrderPayload,
  GetProductMetafieldsReturn,
  Order,
  Pagination,
  ProductMetafieldsResponse,
  UpdateOrderPayload,
  UpdateProductMetafieldResponse
} from './types';

type CreateShopifyConfig = {
  key: string;
  password: string;
  host: string;
  version?: string;
};

export const createShopifyCliente = (config: CreateShopifyConfig): AxiosInstance => {
  const { version, password, key, host } = config;
  console.log({ context: 'Shopify HTTP: Client: Starting Shopify Client', data: { host } });
  const client = Axios.create({
    auth: { username: key, password },
    baseURL: version ? `${host}/admin/api/${version}` : host
  });
  return client;
};

export const getProductDetails = (
  client: AxiosInstance,
  productId: string,
  params?: { fields: string[]; tags: string[] }
): Promise<AxiosResponse<GetDetailedProductResponse>> => {
  console.log({ context: 'Shopify HTTP: Getting all Shopify Products (with Params)' });
  return client.get<GetDetailedProductResponse>(`/products/${productId}.json`, { params });
};

export const getAllProducts = async (
  client: AxiosInstance,
  params?: Partial<GetAllProductsPayload>
): Promise<GetAllProductsResponse> => {
  console.log({ context: `Shopify HTTP: Getting all Shopify Products`, params });
  const response = await client.get<GetAllProductsShopifyResponse>(`/products.json`, { params });
  const link = response.headers?.link as string;
  const links = (link || '').split(',');
  const pagination = links.reduce((acc, link) => {
    const found = new RegExp(/(page_info)=(\w+)>; rel="(previous|next)"/gm).exec(link);

    if (found && found.length === 4) {
      const page_info = found[2];
      const way = found[3];
      acc[way] = page_info;
    }

    return acc;
  }, {} as Pagination);

  return { response, pagination };
};

export const getProductMetafields = (
  client: AxiosInstance,
  productId: number,
  params?: { limit?: number; namespace?: string }
): Promise<GetProductMetafieldsReturn> => {
  console.log({ context: `Shopify HTTP: Getting product "${productId}" metafields` });
  return client.get<ProductMetafieldsResponse>(`/products/${productId}/metafields.json`, { params });
};

export const setProductMetafieldValue = (
  client: AxiosInstance,
  payload: { productId: number; metafieldId: number; value: string | boolean }
): Promise<UpdateProductMetafieldResponse> => {
  console.log({
    context: `Shopify HTTP: Updating product "${payload.productId}" metafield "${payload.metafieldId}" with value "${payload.value}"`
  });
  return client.put<ProductMetafieldsResponse>(
    `/products/${payload.productId}/metafields/${payload.metafieldId}.json`,
    {
      metafield: {
        id: payload.metafieldId,
        value: payload.value
      }
    }
  );
};

export const createNewProductMetafield = (
  client: AxiosInstance,
  payload: {
    productId: number;
    namespace: string;
    key: string;
    value: string | boolean;
    type: 'multi_line_text_field' | 'boolean';
  }
): Promise<CreateProductMetafieldResponse> => {
  console.log({
    context: `Shopify HTTP: Adding new Metafield to product "${payload.productId}" (${payload.key}:${payload.value})`
  });
  const body = {
    metafield: {
      namespace: payload.namespace,
      key: payload.key,
      value: payload.value,
      type: payload.type
    }
  };
  console.log({ body });
  return client.post<ProductMetafieldsResponse>(`/products/${payload.productId}/metafields.json`, body);
};

export const getCollectionProducts = (
  client: AxiosInstance,
  payload: GetCollectionProductsPayload
): Promise<AxiosResponse<GetCollectionProductsResponse>> => {
  Logger.startLog(
    {
      context: `Shopify HTTP: Getting collection "${payload.collectonId}" products.`
    },
    'info'
  );
  return client.get<GetCollectionProductsResponse>(`/collections/${payload.collectonId}/products.json`, {
    params: payload.params
  });
};

export const getOrders = <T = Order>(
  client: AxiosInstance,
  payload: GetOrderPayload
): Promise<AxiosResponse<{ orders: T[] }>> => {
  Logger.startLog(
    {
      context: `Shopify HTTP: GET orders.`,
      data: { payload }
    },
    'info'
  );
  return client.get<{ orders: T[] }>(`/orders.json`, {
    params: payload.params
  });
};

export const getOrderById = <T = Order>(
  client: AxiosInstance,
  orderId: string | number,
  filters: GetOrderPayload
): Promise<AxiosResponse<{ order: T }>> => {
  Logger.startLog(
    {
      context: `Shopify HTTP: GET order by ID.`,
      data: { orderId, filters }
    },
    'info'
  );
  return client.get<{ order: T }>(`/orders/${orderId}.json`, {
    params: filters.params
  });
};

export const updateOrder = (client: AxiosInstance, payload: UpdateOrderPayload): Promise<AxiosResponse<Order>> => {
  Logger.startLog(
    {
      context: `Shopify HTTP: Update Order.`,
      data: { payload }
    },
    'info'
  );
  return client.put<Order>(`/orders/${payload.order.id}.json`, payload);
};

export default {
  createShopifyCliente,
  getProductDetails,
  getAllProducts,
  getProductMetafields,
  setProductMetafieldValue,
  getCollectionProducts,
  createNewProductMetafield,
  getOrders,
  updateOrder,
  getOrderById
};
