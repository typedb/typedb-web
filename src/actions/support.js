
import api from 'api';


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
}