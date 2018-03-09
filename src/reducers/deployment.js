import { FETCH_DEPLOYMENT, RECEIVED_DEPLOYMENT } from 'actions/deployment';

const initialState = {
  loading: false,
  items: []
};

export default function deployment(state = initialState, action) {
  switch (action.type) {
    case FETCH_DEPLOYMENT:
      return { ...state,
        loading: true
      }
    case RECEIVED_DEPLOYMENT:
      return {
        ...state,
        loading: false,
        items: action.payload,
      }
    default:
      return state;
  }
}