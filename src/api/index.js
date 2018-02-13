import endpoints from './endpoints';
import { makeRequest } from './helpers';

const careersjson = require('./mock-careers');
export default {
  getCareers: () => makeRequest(endpoints.careers).then((data) => (data)),
  getTeam: () => makeRequest(endpoints.team).then((data) => data),
  signupNewsletter: (body) => makeRequest(endpoints.newsletter, 'POST', JSON.stringify(body)).then((data) => data),
  sendSupport: (body) => makeRequest(endpoints.support, 'POST', JSON.stringify(body)).then((data) => data)
};