import { FETCH_CLOUDPROVIDERS, RECEIVED_CLOUDPROVIDERS } from 'actions/cloudproviders';

const initialState = {
  loading: false,
  items: []
};

export default function cloudproviders(state = initialState, action) {
  switch (action.type) {
    case FETCH_CLOUDPROVIDERS:
      return { ...state,
        loading: true
      }
    case RECEIVED_CLOUDPROVIDERS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      }
    default:
      return state;
  }
}