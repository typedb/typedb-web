export const FETCH_DOWNLOADS = 'FETCH_DOWNLOADS';
export const RECEIVED_DOWNLOADS = 'RECEIVED_DOWNLOADS';

import api from 'api';

const fetchingDownloads = () => {
  return {
    type: FETCH_DOWNLOADS,
  };
}

const receivedDownloads = (payload) => {
  return {
    type: RECEIVED_DOWNLOADS,
    payload
  };
}

export function fetchDownloads() {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(fetchingDownloads());
    api.getDownloads().then((response) => {
      dispatch(receivedDownloads(response.data));
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}