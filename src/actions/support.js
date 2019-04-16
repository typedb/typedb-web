
import api from '../api';


export function sendHubspot(obj) {
  return (dispatch) => new Promise((resolve, reject) => {
    api.sendHubspot(obj).then((data) => {
      api.signupNewsletter({
        email: obj.formFields.email,
        firstname: obj.formFields.firstname || obj.formFields.firstName,
        lastname: obj.formFields.lastname || obj.formFields.lastName,
      });
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