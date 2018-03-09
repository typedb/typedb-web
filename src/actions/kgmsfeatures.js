export const FETCH_KGMSFEATURES = 'FETCH_KGMSFEATURES';
export const RECEIVED_KGMSFEATURES = 'RECEIVE_KGMSFEATURES';

import api from 'api';

const fetchingKgmsfeatures = () => {
  return {
    type: FETCH_KGMSFEATURES,
  };
}

const receivedKgmsfeatures = (payload) => {
  return {
    type: RECEIVED_KGMSFEATURES,
    payload
  };
}

export function fetchKgmsfeatures() {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(fetchingKgmsfeatures());
    api.getKgmsfeatures().then((response) => {
      dispatch(receivedKgmsfeatures(response.data));
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}