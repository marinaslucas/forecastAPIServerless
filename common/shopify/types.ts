import { AxiosInstance, AxiosResponse } from 'axios';

export type ShopifyClient = AxiosInstance;
export interface GetDetailedProductResponse {
  product: IShopifyProduct;
}

export interface GetAllProductsShopifyResponse {
  products: IShopifyProduct[];
}
export interface IShopifyProduct {
  id: number;
  title: string;
  body_html: string;
  vendor: Vendor;
  product_type: ProductType;
  created_at: Date;
  handle: string;
  updated_at: Date;
  published_at: Date;
  template_suffix: string;
  status: ProductStatus;
  published_scope: PublishedScope;
  tags: string;
  admin_graphql_api_id: string;
  options: ProdcutOption[];
  variants: Variant[];
  images: Image[];
  image: Image;
}

export enum ProductStatus {
  Active = 'active',
  Archived = 'archived',
  Draft = 'draft'
}

export enum Vendor {
  Sallve = 'Sallve'
}

enum ProductType {
  MercadoriaParaRevenda = 'Mercadoria para Revenda'
}

enum PublishedScope {
  Global = 'global',
  Web = 'web'
}
export interface Image {
  id: number;
  product_id: number;
  position: number;
  created_at: Date;
  updated_at: Date;
  alt: null;
  width: number;
  height: number;
  src: string;
  variant_ids: number[];
  admin_graphql_api_id: string;
}

export interface ProdcutOption {
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: string[];
}

export interface Variant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  sku: string;
  position: number;
  inventory_policy: string;
  compare_at_price: null;
  fulfillment_service: string;
  inventory_management: string;
  option1: string;
  option2: null;
  option3: null;
  created_at: Date;
  updated_at: Date;
  taxable: boolean;
  barcode: string;
  grams: number;
  image_id: number | null;
  weight: number;
  weight_unit: string;
  inventory_item_id: number;
  inventory_quantity: number;
  old_inventory_quantity: number;
  presentment_prices: PresentmentPrice[];
  requires_shipping: boolean;
  admin_graphql_api_id: string;
}

export interface PresentmentPrice {
  price: ProductPrice;
  compare_at_price: null;
}

export interface ProductPrice {
  amount: string;
  currency_code: string;
}

export interface ProductMetafieldsResponse {
  metafields: Metafield[];
}

export interface Metafield {
  id: number;
  namespace: string;
  key: string;
  value: string | boolean;
  value_type: 'string' | 'boolean';
  description: null;
  owner_id: number;
  created_at: string;
  updated_at: string;
  owner_resource: string;
  type: string;
  admin_graphql_api_id: string;
}

export interface Pagination {
  previous?: string;
  next?: string;
}

export type GetCollectionProductsPayload = {
  collectonId: number;
  params?: {
    fields?: string;
    limit?: number;
  };
};

export interface GetCollectionProductsResponse {
  products: IShopifyProduct[];
}

export interface GetAllProductsPayload {
  limit: number;
  status: ProductStatus;
  since_id: string;
  page_info: string;
  fields: string[];
}

export interface GetAllProductsResponse {
  response: AxiosResponse<GetAllProductsShopifyResponse>;
  pagination: Pagination;
}

export type GetOrderPayload = {
  params: Partial<{
    created_at_max: Date;
    created_at_min: Date;
    limit: number;
    since_id: number;
    fields: string;
    order: string;
    financial_status: string;
    fulfillment_status: string;
    name: string;
  }>;
};

export type UpdateOrderPayload = {
  order: UpdateOrderOrder;
};
interface UpdateOrderOrder extends Partial<Order> {
  id: number;
}
export interface Order {
  id: number;
  admin_graphql_api_id: string;
  app_id: number;
  browser_ip: string;
  buyer_accepts_marketing: boolean;
  cancel_reason: null;
  cancelled_at: null;
  cart_token: null;
  checkout_id: number;
  checkout_token: string;
  client_details: ClientDetails;
  closed_at: null;
  confirmed: boolean;
  contact_email: string;
  created_at: Date;
  currency: Currency;
  current_subtotal_price: string;
  current_subtotal_price_set: Set;
  current_total_discounts: string;
  current_total_discounts_set: Set;
  current_total_duties_set: null;
  current_total_price: string;
  current_total_price_set: Set;
  current_total_tax: string;
  current_total_tax_set: Set;
  customer_locale: string;
  device_id: null;
  discount_codes: any[];
  email: string;
  estimated_taxes: boolean;
  financial_status: string;
  fulfillment_status: null;
  gateway: string;
  landing_site: string;
  landing_site_ref: null;
  location_id: null;
  name: string;
  note: null;
  note_attributes: NoteAttribute[];
  number: number;
  order_number: number;
  order_status_url: string;
  original_total_duties_set: null;
  payment_gateway_names: string[];
  phone: null;
  presentment_currency: Currency;
  processed_at: Date;
  processing_method: string;
  reference: null;
  referring_site: string;
  source_identifier: null;
  source_name: string;
  source_url: null;
  subtotal_price: string;
  subtotal_price_set: Set;
  tags: string;
  tax_lines: any[];
  taxes_included: boolean;
  test: boolean;
  token: string;
  total_discounts: string;
  total_discounts_set: Set;
  total_line_items_price: string;
  total_line_items_price_set: Set;
  total_outstanding: string;
  total_price: string;
  total_price_set: Set;
  total_price_usd: string;
  total_shipping_price_set: Set;
  total_tax: string;
  total_tax_set: Set;
  total_tip_received: string;
  total_weight: number;
  updated_at: Date;
  user_id: null;
  billing_address: Address;
  customer: Customer;
  discount_applications: DiscountApplication[];
  fulfillments: any[];
  line_items: LineItem[];
  refunds: any[];
  shipping_address: Address;
  shipping_lines: ShippingLine[];
}

export interface Address {
  first_name: string;
  address1: Address1;
  phone: string;
  city: City;
  zip: Zip;
  province: string;
  country: string;
  last_name: string;
  address2: Address2;
  company: string;
  latitude?: number;
  longitude?: number;
  name: Name;
  country_code: CountryCode;
  province_code: ProvinceCode;
  id?: number;
  customer_id?: number;
  country_name?: string;
  default?: boolean;
}

export enum Address1 {
  RodoviaCoronelPMNelsonTranchesi740 = 'Rodovia Coronel PM Nelson Tranchesi, 740',
  RuaVilebaldoAguiar2100Cocó = 'Rua Vilebaldo Aguiar, 2100 - Cocó'
}

export enum Address2 {
  Apt502Torre2 = 'Apt 502 torre 2',
  Galpao32 = 'Galpao 32'
}

export enum City {
  Fortaleza = 'Fortaleza',
  Itapevi = 'Itapevi'
}

export enum CountryCode {
  Br = 'BR'
}

export enum Name {
  LarissaMeiraWanderley = 'Larissa Meira Wanderley',
  Sallve = 'Sallve'
}

export enum ProvinceCode {
  Ce = 'CE',
  SP = 'SP'
}

export enum Zip {
  The06696110 = '06696-110',
  The60192035 = '60192-035'
}

export interface ClientDetails {
  accept_language: string;
  browser_height: number;
  browser_ip: string;
  browser_width: number;
  session_hash: null;
  user_agent: string;
}

export enum Currency {
  Brl = 'BRL'
}

export interface Set {
  shop_money: Money;
  presentment_money: Money;
}

export interface Money {
  amount: string;
  currency_code: Currency;
}

export interface Customer {
  id: number;
  email: string;
  accepts_marketing: boolean;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  orders_count: number;
  state: string;
  total_spent: string;
  last_order_id: number;
  note: null;
  verified_email: boolean;
  multipass_identifier: null;
  tax_exempt: boolean;
  phone: null;
  tags: string;
  last_order_name: string;
  currency: Currency;
  accepts_marketing_updated_at: Date;
  marketing_opt_in_level: null;
  tax_exemptions: any[];
  admin_graphql_api_id: string;
  default_address: Address;
}

export interface DiscountApplication {
  target_type: string;
  type: string;
  value: string;
  value_type: string;
  allocation_method: string;
  target_selection: string;
  title: string;
  description: string;
}

export interface LineItem {
  id: number;
  admin_graphql_api_id: string;
  destination_location: NLocation;
  fulfillable_quantity: number;
  fulfillment_service: string;
  fulfillment_status: null;
  gift_card: boolean;
  grams: number;
  name: string;
  origin_location: NLocation;
  pre_tax_price: string;
  pre_tax_price_set: Set;
  price: string;
  price_set: Set;
  product_exists: boolean;
  product_id: number;
  properties: Property[];
  quantity: number;
  requires_shipping: boolean;
  sku: string;
  taxable: boolean;
  title: string;
  total_discount: string;
  total_discount_set: Set;
  variant_id: number;
  variant_inventory_management: string;
  variant_title: string;
  vendor: Name;
  tax_lines: any[];
  duties: any[];
  discount_allocations: DiscountAllocation[];
}

export interface NLocation {
  id: number;
  country_code: CountryCode;
  province_code: ProvinceCode;
  name: Name;
  address1: Address1;
  address2: Address2;
  city: City;
  zip: Zip;
}

export interface DiscountAllocation {
  amount: string;
  amount_set: Set;
  discount_application_index: number;
}

export interface Property {
  name: string;
  value: string;
}

export interface NoteAttribute {
  name: string;
  value: number | string;
}

export interface ShippingLine {
  id: number;
  carrier_identifier: string;
  code: string;
  delivery_category: null;
  discounted_price: string;
  discounted_price_set: Set;
  phone: null;
  price: string;
  price_set: Set;
  requested_fulfillment_service_id: null;
  source: string;
  title: string;
  tax_lines: any[];
  discount_allocations: any[];
}

export type GetProductMetafieldsReturn = AxiosResponse<ProductMetafieldsResponse>;
export type UpdateProductMetafieldResponse = AxiosResponse<ProductMetafieldsResponse>;
export type CreateProductMetafieldResponse = AxiosResponse<ProductMetafieldsResponse>;
export type GetCollectionProductsHttpResponse = AxiosResponse<GetCollectionProductsResponse>;
