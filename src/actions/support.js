
import api from '../api';


export function sendHubspot(obj) {
  return (dispatch) => new Promise((resolve, reject) => {
    api.sendHubspot(obj).then((data) => {
      console.log("sendHubspot 1")
      // dispatch(successSupport(data.msg));
      console.log("sendHubspot 2")
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