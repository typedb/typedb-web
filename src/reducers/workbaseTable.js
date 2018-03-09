import { FETCH_WORKBASETABLE, RECEIVED_WORKBASETABLE } from 'actions/workbaseTable';

const initialState = {
  loading: false,
  items: []
};

export default function workbaseTable(state = initialState, action) {
  switch (action.type) {
    case FETCH_WORKBASETABLE:
      return { ...state,
        loading: true
      }
    case RECEIVED_WORKBASETABLE:
      return {
        ...state,
        loading: false,
        items: action.payload,
      }
    default:
      return state;
  }
}