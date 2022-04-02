import TemplateService from './service';

export async function templateFunction() {
  const service = TemplateService();

  service.someFunction();

  return {
    status: 200,
    body: 'Sucesso'
  };
}
