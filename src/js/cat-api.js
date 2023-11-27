import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_iDoiV0EHJllOQpbTYpgldcvoG2FwbjPi0qHS9L5SZQ11njYtU009ZPQL3TlvYCrZ';
const API_KEY =
   'live_iDoiV0EHJllOQpbTYpgldcvoG2FwbjPi0qHS9L5SZQ11njYtU009ZPQL3TlvYCrZ';
const BASE_URL = 'https://api.thecatapi.com/v1';  
const BREEDS_ENDPOINT = 'breeds';
const DESCRIPTION_ENDPOINT = 'images/search';

// Колекція порід
export function fetchBreeds() {
  return axios.get(`${BASE_URL}/${BREEDS_ENDPOINT}`).then(({ data }) => data);
}; 

// Інформація про кота
export function fetchCatByBreed(breedId) {
  const params = new URLSearchParams({
    breed_ids: breedId,
  });
    return axios
      .get(`${BASE_URL}/${DESCRIPTION_ENDPOINT}?${params}`)
      .then(({ data }) => data);
}




