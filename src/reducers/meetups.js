import { FETCH_MEETUPS, RECEIVED_MEETUPS } from 'actions/meetups';

const initialState = {
  loading: false,
  items: []
};

export default function meetups(state = initialState, action) {
  switch (action.type) {
    case FETCH_MEETUPS:
      return { ...state,
        loading: true
      }
    case RECEIVED_MEETUPS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      }
    default:
      return state;
  }
}