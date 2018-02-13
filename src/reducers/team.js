import { FETCH_TEAM, RECEIVED_TEAM } from 'actions/team';

const initialState = {
  loading: false,
  items: []
};

export default function team(state = initialState, action) {
  switch (action.type) {
    case FETCH_TEAM:
      return { ...state,
        loading: true
      }
    case RECEIVED_TEAM:
      return {
        ...state,
        loading: false,
        items: action.payload,
      }
    default:
      return state;
  }
}