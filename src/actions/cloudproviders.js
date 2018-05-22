export const FETCH_CLOUDPROVIDERS = 'FETCH_CLOUDPROVIDERS';
export const RECEIVED_CLOUDPROVIDERS = 'RECEIVED_CLOUDPROVIDERS';

import api from 'api';

const fetchingCloudproviders = () => {
  return {
    type: FETCH_CLOUDPROVIDERS,
  };
}

const receivedCloudproviders = (payload) => {
  return {
    type: RECEIVED_CLOUDPROVIDERS,
    payload
  };
}

export function fetchCloudproviders() {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(fetchingCloudproviders());
    api.getCloudproviders().then((response) => {
      dispatch(receivedCloudproviders(response.data));
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}