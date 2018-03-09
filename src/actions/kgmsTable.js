export const FETCH_KGMSTABLE = 'FETCH_KGMSTABLE';
export const RECEIVED_KGMSTABLE = 'RECEIVE_KGMSTABLE';

import api from 'api';

const fetchingKgmstable = () => {
  return {
    type: FETCH_KGMSTABLE,
  };
}

const receivedKgmstable = (payload) => {
  return {
    type: RECEIVED_KGMSTABLE,
    payload
  };
}

export function fetchKgmstable() {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(fetchingKgmstable());
    api.getKgmstable().then((response) => {
      dispatch(receivedKgmstable(response.data));
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}