import { FETCH_SUPPORTTABLE, RECEIVED_SUPPORTTABLE } from 'actions/supportTable';

const initialState = {
  loading: false,
  items: []
};

export default function supportTable(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUPPORTTABLE:
      return { ...state,
        loading: true
      }
    case RECEIVED_SUPPORTTABLE:
      return {
        ...state,
        loading: false,
        items: action.payload,
      }
    default:
      return state;
  }
}