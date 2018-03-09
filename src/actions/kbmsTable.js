export const FETCH_KBMSTABLE = 'FETCH_KBMSTABLE';
export const RECEIVED_KBMSTABLE = 'RECEIVE_KBMSTABLE';

import api from 'api';

const fetchingKbmstable = () => {
  return {
    type: FETCH_KBMSTABLE,
  };
}

const receivedKbmstable = (payload) => {
  return {
    type: RECEIVED_KBMSTABLE,
    payload
  };
}

export function fetchKbmstable() {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(fetchingKbmstable());
    api.getKbmstable().then((response) => {
      dispatch(receivedKbmstable(response.data));
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}