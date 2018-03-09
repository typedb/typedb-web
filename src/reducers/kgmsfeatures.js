import { FETCH_KGMSFEATURES, RECEIVED_KGMSFEATURES } from 'actions/kgmsfeatures';

const initialState = {
  loading: false,
  items: []
};

export default function kgmsfeatures(state = initialState, action) {
  switch (action.type) {
    case FETCH_KGMSFEATURES:
      return { ...state,
        loading: true
      }
    case RECEIVED_KGMSFEATURES:
      return {
        ...state,
        loading: false,
        items: action.payload,
      }
    default:
      return state;
  }
}