import { FETCH_DOWNLOADS, RECEIVED_DOWNLOADS } from 'actions/downloads';

const initialState = {
  loading: false,
  items: []
};

export default function careers(state = initialState, action) {
  switch (action.type) {
    case FETCH_DOWNLOADS:
      return { ...state,
        loading: true
      }
    case RECEIVED_DOWNLOADS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      }
    default:
      return state;
  }
}