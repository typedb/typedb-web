export const SEND_SUPPORT = 'SUPPORT_FORM';
export const SUCCESS_SUPPORT = 'RECEIVE_SUPPORT';

import api from 'api';

const sendingSupport = () => {
  return {
    type: SEND_SUPPORT,
  };
}

const successSupport = (payload) => {
  alert(payload);  
  return {
    type: SUCCESS_SUPPORT,
  };
}

export function sendSupport(obj) {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(sendingSupport());
    api.sendSupport(obj).then((data) => {
      dispatch(successSupport(data.msg));
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}

export function sendHubspot(obj) {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(sendingSupport());
    api.sendHubspot(obj).then((data) => {
      dispatch(successSupport(data.msg));
    })
    .catch((errors) => {
      reject(errors);
    });
  });
  console.log(obj)
}