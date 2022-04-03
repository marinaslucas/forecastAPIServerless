import { ApiGatewayResponseServiceFactory } from './utils';

describe('ApiGateway utils', () => {
  describe('Responses Service', () => {
    const ApiGatewayResponseService = ApiGatewayResponseServiceFactory();
    const payload = { a: 1 };

    it('ok', () => {
      const response = ApiGatewayResponseService.ok(payload);
      expect(response).toHaveProperty('statusCode', 200);
      expect(response.body).toBe(JSON.stringify(payload));
    });

    it('created', () => {
      const response = ApiGatewayResponseService.created(payload);
      expect(response).toHaveProperty('statusCode', 201);
      expect(response.body).toBe(JSON.stringify(payload));
    });

    it('accepted', () => {
      const response = ApiGatewayResponseService.accepted();
      expect(response).toHaveProperty('statusCode', 202);
      expect(response.body).toBeUndefined();
    });

    it('noContent', () => {
      const response = ApiGatewayResponseService.noContent();
      expect(response).toHaveProperty('statusCode', 204);
      expect(response.body).toBeUndefined();
    });
  });
});
