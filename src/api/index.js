import { api } from './configs';
import { SERVER_URL } from '../constants';

class Api {
  static url = SERVER_URL;

  /* Account Start */

  static auth(body) {
    return api.post('/account/auth', body);
  }

  static passwordRecovery({ email }) {
    return api.get(`/account/password/restore/${email}`);
  }

  static init({ lang }) {
    return api.get(`/account/init?lang=${lang}`);
  }

  /* Account End */

  /* Data Start */

  static getALlCities(body) {
    return api.get('/account/cities', body);
  }

  /* Data End */

  /* Configurations Start */

  static calculateConfiguration(body) {
    return api.post('/account/calculate', body);
  }

  static createConfigurationWithScratch(body) {
    return api.post('/account/scratch', body);
  }

  static createConfigurationWithTemplate(params) {
    return api.get('/account/template', { params });
  }

  static getConfigurations(params) {
    return api.get('/account/configurations', { params });
  }

  static getSingleConfiguration({ id }) {
    return api.get(`/account/configurations/${id}`);
  }

  static editConfiguration(body) {
    return api.post('/account/configurations', body);
  }

  static deleteConfigurations(body) {
    return api.post('/account/configurations/delete', body);
  }

  static generateConfigurationsArchive(body) {
    return api.post('/account/projects/archive', body);
  }

  static generateConfigurationsDock(body) {
    return api.post('/account/projects/dock', body);
  }

  static generateConfigurationsEmail(body) {
    return api.post('/account/projects/email', body);
  }

  /* Configurations End */

  /* Projects Start */

  static getProjects(params) {
    return api.get('/account/projects', { params });
  }

  static createProject(body) {
    return api.post('/account/projects', body);
  }

  static updateProject({ body, id }) {
    return api.patch(`/account/projects/${id}`, body);
  }

  static deleteProjects(body) {
    return api.post('/account/projects/delete', body);
  }

  static getConfigurationsOfProject({ id, params }) {
    return api.get(`/account/projects/${id}`, { params });
  }

  static generateProjectsArchive(body) {
    return api.post('/account/projects/archive', body);
  }

  static generateProjectsDock(body) {
    return api.post('/account/projects/dock', body);
  }

  static generateProjectsEmail(body) {
    return api.post('/account/projects/email', body);
  }

  /* Projects End */
}

export default Api;
