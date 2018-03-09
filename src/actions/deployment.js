export const FETCH_DEPLOYMENT = 'FETCH_DEPLOYMENT';
export const RECEIVED_DEPLOYMENT = 'RECEIVE_DEPLOYMENT';

import api from 'api';

const fetchingDeployment = () => {
  return {
    type: FETCH_DEPLOYMENT,
  };
}

const receivedDeployment = (payload) => {
  return {
    type: RECEIVED_DEPLOYMENT,
    payload
  };
}

export function fetchDeployment() {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(fetchingDeployment());
    api.getDeployment().then((response) => {
      dispatch(receivedDeployment(response.data));
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}