export type ApiGatewayResponseI = { statusCode: number; body: string; headers?: Record<string, string> };

export interface IApiGatewayResponseService {
  ok: (data: any) => ApiGatewayResponseI;
  created: (data: any) => ApiGatewayResponseI;
  accepted: () => ApiGatewayResponseI;
  noContent: () => ApiGatewayResponseI;
}
