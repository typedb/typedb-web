import { FETCH_EVENTS, RECEIVED_EVENTS } from 'actions/events';

const initialState = {
  loading: false,
  items: []
};

export default function events(state = initialState, action) {
  switch (action.type) {
    case FETCH_EVENTS:
      return { ...state,
        loading: true
      }
    case RECEIVED_EVENTS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      }
    default:
      return state;
  }
}