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
    dispatch(fetchingCareers());
    api.getCareers().then((response) => {
      dispatch(receivedCareers(response.data));
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}