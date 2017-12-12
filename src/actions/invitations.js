import api from 'api';

export function newsletter(obj) {
  return (dispatch) => new Promise((resolve, reject) => {
    api.signupNewsletter(obj).then((data) => {
      resolve();
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}
