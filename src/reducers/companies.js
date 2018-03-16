import { FETCH_COMPANIES, RECEIVED_COMPANIES } from 'actions/companies';

const initialState = {
  loading: false,
  items: []
};

export default function companies(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMPANIES:
      return { ...state,
        loading: true
      }
    case RECEIVED_COMPANIES:
      return {
        ...state,
        loading: false,
        items: action.payload,
      }
    default:
      return state;
  }
}