export const FETCH_KBMSFEATURES = 'FETCH_KBMSFEATURES';
export const RECEIVED_KBMSFEATURES = 'RECEIVE_KBMSFEATURES';

import api from 'api';

const fetchingKbmsfeatures = () => {
  return {
    type: FETCH_KBMSFEATURES,
  };
}

const receivedKbmsfeatures = (payload) => {
  return {
    type: RECEIVED_KBMSFEATURES,
    payload
  };
}

export function fetchKbmsfeatures() {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(fetchingKbmsfeatures());
    api.getKbmsfeatures().then((response) => {
      dispatch(receivedKbmsfeatures(response.data));
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}