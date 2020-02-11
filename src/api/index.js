import endpoints from './endpoints';
import { makeRequest } from './helpers';

export default {
  getCareers: () => makeRequest(endpoints.careers).then((data) => (data)),
  getTeam: () => makeRequest(endpoints.team).then((data) => data),
  getDownloads: () => makeRequest(endpoints.downloads).then((data) => data),
  getEvents: () => makeRequest(endpoints.events).then((data) => data),
  getMeetups: () => makeRequest(endpoints.meetups).then((data) => data),
  getTestimonials: () => makeRequest(endpoints.testimonials).then((data) => data),
  getKgmsfeatures: () => makeRequest(endpoints.kgmsfeatures).then((data) => data),
  getCloudproviders: () => makeRequest(endpoints.cloudproviders).then((data) => data),
  getDeployment: () => makeRequest(endpoints.deployment).then((data) => data),
  getSupporttable: () => makeRequest(endpoints.supporttable).then((data) => data),
  getKgmstable: () => makeRequest(endpoints.kgmstable).then((data) => data),
  getWorkbasetable: () => makeRequest(endpoints.workbasetable).then((data) => data),
  getCompanies: () => makeRequest(endpoints.companies).then((data) => data),
  sendSupport: (body) => makeRequest(endpoints.support, 'POST', JSON.stringify(body)).then((data) => data),
  sendHubspot: (body) => makeRequest(endpoints.hubspot, 'POST',  JSON.stringify(body)).then((data) => data),
  getDownloadCount: (body) => makeRequest(endpoints.downloadCount).then((data) => data),

  track: (body) => makeRequest(endpoints.track, 'POST', JSON.stringify(body)).then((data) => data)
};
