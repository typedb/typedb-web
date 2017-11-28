import fetch from 'isomorphic-fetch';

require('es6-promise').polyfill();

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin':'*',
};

const handleHttpErrors = (response) => {
  if (!response.ok) {
    return Promise.reject({
      type: 'http', response, content: { errors: [{ desc: response.statusText }] },
    });
  }
  return response;
};

const handleContentErrorsAndParse = (response, debug) =>
  response.json().then((json) => {
    if (json.status === 'FAILURE' ||
    (json.content && (json.content.status === 'ERROR' || json.content.status === 'FAILED'))) {
      return Promise.reject({ type: 'content', response, content: json });
    }
    return json;
  });

export const makeRequest = (
  url, method = 'GET', body,
  headers = defaultHeaders,
) => fetch(url, {
  method,
  dataType: 'json',
  headers,
  body, 
})
  .then(handleHttpErrors)
  .then(handleContentErrorsAndParse);
