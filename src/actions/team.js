export const FETCH_TEAM = 'FETCH_TEAM';
export const RECEIVED_TEAM = 'RECEIVE_TEAM';

import api from 'api';

const fetchingTeam = () => {
  return {
    type: FETCH_TEAM,
  };
}

const receivedTeam = (payload) => {
  return {
    type: RECEIVED_TEAM,
    payload
  };
}

export function fetchTeam() {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(fetchingTeam());
    api.getTeam().then((response) => {
      dispatch(receivedTeam(response.data));
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}