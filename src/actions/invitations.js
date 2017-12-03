import api from 'api';

export function singleNewsletter(email) {
  const obj = {
    email: email
  };
  return (dispatch) => new Promise((resolve, reject) => {
    api.signupNewsletter(obj).then((data) => {
      resolve();
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}