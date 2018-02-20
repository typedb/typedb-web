import endpoints from './endpoints';
import { makeRequest } from './helpers';

export default {
  getCareers: () => makeRequest(endpoints.careers).then((data) => (data)),
  getTeam: () => makeRequest(endpoints.team).then((data) => data),
  getDownloads: () => makeRequest(endpoints.downloads).then((data) => data),
  getEvents: () => makeRequest(endpoints.events).then((data) => data),
  signupNewsletter: (body) => makeRequest(endpoints.newsletter, 'POST', JSON.stringify(body)).then((data) => data),
  sendSupport: (body) => makeRequest(endpoints.support, 'POST', JSON.stringify(body)).then((data) => data)
};