export const FETCH_TESTIMONIALS = 'FETCH_TESTIMONIALS';
export const RECEIVED_TESTIMONIALS = 'RECEIVED_TESTIMONIALS';

import api from 'api';

const fetchingTestimonials = () => {
  return {
    type: FETCH_TESTIMONIALS,
  };
}

const receivedTestimonials = (payload) => {
  return {
    type: RECEIVED_TESTIMONIALS,
    payload
  };
}

export function fetchTestimonials() {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(fetchingTestimonials());
    api.getTestimonials().then((response) => {
      dispatch(receivedTestimonials(response.data));
    })
    .catch((errors) => {
      reject(errors);
    });
  });
} 