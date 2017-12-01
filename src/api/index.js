import endpoints from './endpoints';
import { makeRequest } from './helpers';

const careersjson = require('./mock-careers');
export default {
  // getCareers: () => makeRequest(endpoints.careers).then((data) => (data)),
  getCareers: () => Promise.resolve(careersjson).then((careersjson) => careersjson),
};