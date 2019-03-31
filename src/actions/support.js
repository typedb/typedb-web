
import api from '../api';


export function sendHubspot(obj) {
  return (dispatch) => new Promise((resolve, reject) => {
    api.sendHubspot(obj).then((data) => {
      // dispatch(successSupport(data.msg));
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}

export function sendSupport(obj) {
  return (dispatch) => new Promise((resolve, reject) => {
    api.sendSupport(obj).then((data) => {
      // dispatch(successSupport(data.msg));
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}