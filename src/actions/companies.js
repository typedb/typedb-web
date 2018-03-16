export const FETCH_COMPANIES = 'FETCH_COMPANIES';
export const RECEIVED_COMPANIES = 'RECEIVE_COMPANIES';

import api from 'api';

const fetchingCompanies = () => {
  return {
    type: FETCH_COMPANIES,
  };
}

const receivedCompanies = (payload) => {
  return {
    type: RECEIVED_COMPANIES,
    payload
  };
}

export function fetchCompanies() {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(fetchingCompanies());
    api.getCompanies().then((response) => {
      dispatch(receivedCompanies(response.data));
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}