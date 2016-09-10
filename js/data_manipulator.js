import { fetchStationData } from './api_utils.js';

const success = message => {
  console.log(message);
};


export const initializeData = () => {
  fetchStationData(success);
};
