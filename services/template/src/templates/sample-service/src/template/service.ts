import TemplateRepository from './repository';

const TemplateService = ({ repository = TemplateRepository() } = {}) => {
  async function someFunction() {
    await repository.accessDB();
  }

  return {
    someFunction
  };
};

export default TemplateService;
