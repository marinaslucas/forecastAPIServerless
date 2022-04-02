import TemplateService from './service';

describe('template', () => {
  const accessDB = jest.fn();

  // Mocking dependencies
  const repository = {
    accessDB
  } as any;

  const service = TemplateService({ repository });

  describe('someFunction', () => {
    it('should do something', async () => {
      service.someFunction();

      expect('template').toBe('template');
    });
  });
});
