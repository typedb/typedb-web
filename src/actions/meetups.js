export const FETCH_MEETUPS = 'FETCH_MEETUPS';
export const RECEIVED_MEETUPS = 'RECEIVE_MEETUPS';

import api from 'api';

const fetchingmeetups = () => {
  return {
    type: FETCH_MEETUPS,
  };
}

const receivedmeetups = (payload) => {
  return {
    type: RECEIVED_MEETUPS,
    payload
  };
}

export function fetchMeetups() {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(fetchingmeetups());
    api.getMeetups().then((response) => {
      dispatch(receivedmeetups(response.data));
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}