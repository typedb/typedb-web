import { FETCH_KBMSTABLE, RECEIVED_KBMSTABLE } from 'actions/kbmsTable';

const initialState = {
  loading: false,
  items: []
};

export default function kbmsTable(state = initialState, action) {
  switch (action.type) {
    case FETCH_KBMSTABLE:
      return { ...state,
        loading: true
      }
    case RECEIVED_KBMSTABLE:
      return {
        ...state,
        loading: false,
        items: action.payload,
      }
    default:
      return state;
  }
}