export const FETCH_CAREERS = 'FETCH_CAREERS';
export const RECEIVED_CAREERS = 'RECEIVE_CAREERS';

import api from 'api';

const fetchingCareers = () => {
  return {
    type: FETCH_CAREERS,
  };
}

const receivedCareers = (payload) => {
  return {
    type: RECEIVED_CAREERS,
    payload
  };
}

export function fetchCareers() {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(fetchCareers());
    api.getCareers().then((data) => {
      console.log(data);
      resolve();
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}