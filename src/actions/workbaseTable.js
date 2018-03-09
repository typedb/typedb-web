export const FETCH_WORKBASETABLE = 'FETCH_WORKBASETABLE';
export const RECEIVED_WORKBASETABLE = 'RECEIVE_WORKBASETABLE';

import api from 'api';

const fetchingWorkbasetable = () => {
  return {
    type: FETCH_WORKBASETABLE,
  };
}

const receivedWorkbasetable = (payload) => {
  return {
    type: RECEIVED_WORKBASETABLE,
    payload
  };
}

export function fetchWorkbasetable() {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(fetchingWorkbasetable());
    api.getWorkbasetable().then((response) => {
      dispatch(receivedWorkbasetable(response.data));
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}