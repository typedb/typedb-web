export const FETCH_EVENTS = 'FETCH_EVENTS';
export const RECEIVED_EVENTS = 'RECEIVE_EVENTS';

import api from 'api';

const fetchingEvents = () => {
  return {
    type: FETCH_EVENTS,
  };
}

const receivedEvents = (payload) => {
  return {
    type: RECEIVED_EVENTS,
    payload
  };
}

export function fetchEvents() {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(fetchingEvents());
    api.getEvents().then((response) => {
      dispatch(receivedEvents(response.data));
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}