export const FETCH_DOWNLOADS = 'FETCH_DOWNLOADS';
export const RECEIVED_DOWNLOADS = 'RECEIVED_DOWNLOADS';
export const DOWNLOAD_COUNT = 'DOWNLOAD_COUNT';

import api from 'api';
import { sum } from 'lodash';

const fetchingDownloads = () => {
  return {
    type: FETCH_DOWNLOADS,
  };
}

const receivedDownloads = (payload) => {
  return {
    type: RECEIVED_DOWNLOADS,
    payload
  };
}

export function fetchDownloads() {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(fetchingDownloads());
    api.getDownloads().then((response) => {
      dispatch(receivedDownloads(response.data));
    })
    .catch((errors) => {
      reject(errors);
    });
  });
}

const receievedDownloadCount = (payload) => {
  return {
    type: DOWNLOAD_COUNT,
    payload
  }
}

export function fetchDownloadCount() {
  return (dispatch) => new Promise((resolve, reject) => {
    api.getDownloadCount().then((response) => {
      const download_count = sum(response.map((item, index) => {
        const currentSum = sum(item.assets.map((asset, index) => {
          return asset.download_count;
        }));
        return currentSum
      }));
      dispatch(receievedDownloadCount(download_count));
    })
    .catch((errors) => {
      reject(errors);
    })
  });
}