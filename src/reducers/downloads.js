import { FETCH_DOWNLOADS, RECEIVED_DOWNLOADS, DOWNLOAD_COUNT } from 'actions/downloads';

const initialState = {
  loading: false,
  items: [],
  download_count: null,
};

export default function careers(state = initialState, action) {
  switch (action.type) {
    case FETCH_DOWNLOADS:
      return { ...state,
        loading: true
      }
    case RECEIVED_DOWNLOADS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      }
    case DOWNLOAD_COUNT:
      return {
        ...state,
        download_count: action.payload
      }
    default:
      return state;
  }
}