import { FETCH_CAREERS, RECEIVED_CAREERS } from 'actions/careers';

const initialState = {
  loading: false,
  items: []
};

export default function careers(state = initialState, action) {
  switch (action.type) {
    case FETCH_CAREERS:
      return { ...state,
        loading: true
      }
    case RECEIVED_CAREERS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      }
    default:
      return state;
  }
}