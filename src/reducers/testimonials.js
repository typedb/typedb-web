import { FETCH_TESTIMONIALS, RECEIVED_TESTIMONIALS } from 'actions/testimonials';

const initialState = {
  loading: false,
  items: []
};

export default function testimonials(state = initialState, action) {
  switch (action.type) {
    case FETCH_TESTIMONIALS:
      return { ...state,
        loading: true
      }
    case RECEIVED_TESTIMONIALS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      }
    default:
      return state;
  }
}