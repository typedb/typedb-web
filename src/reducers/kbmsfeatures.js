import { FETCH_KBMSFEATURES, RECEIVED_KBMSFEATURES } from 'actions/kbmsfeatures';

const initialState = {
  loading: false,
  items: []
};

export default function kbmsfeatures(state = initialState, action) {
  switch (action.type) {
    case FETCH_KBMSFEATURES:
      return { ...state,
        loading: true
      }
    case RECEIVED_KBMSFEATURES:
      return {
        ...state,
        loading: false,
        items: action.payload,
      }
    default:
      return state;
  }
}