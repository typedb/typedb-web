export const FETCH_SUPPORTTABLE = 'FETCH_SUPPORTTABLE';
export const RECEIVED_SUPPORTTABLE = 'RECEIVE_SUPPORTTABLE';

import api from 'api';

const fetchingSupporttable = () => {
  return {
    type: FETCH_SUPPORTTABLE,
  };
}

const receivedSupporttable = (payload) => {
  return {
    type: RECEIVED_SUPPORTTABLE,
    payload
  };
}

export function fetchSupporttable() {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(fetchingSupporttable());
    api.getSupporttable().then((response) => {
      dispatch(receivedSupporttable(response.data));
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}