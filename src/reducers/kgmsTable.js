import { FETCH_KGMSTABLE, RECEIVED_KGMSTABLE } from 'actions/kgmsTable';

const initialState = {
  loading: false,
  items: []
};

export default function kgmsTable(state = initialState, action) {
  switch (action.type) {
    case FETCH_KGMSTABLE:
      return { ...state,
        loading: true
      }
    case RECEIVED_KGMSTABLE:
      return {
        ...state,
        loading: false,
        items: action.payload,
      }
    default:
      return state;
  }
}