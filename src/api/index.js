import endpoints from './endpoints';
import { makeRequest } from './helpers';

export default {
  getCareers: () => makeRequest(endpoints.careers).then((data) => (data)),
};