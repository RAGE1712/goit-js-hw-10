import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
    'live_iDoiV0EHJllOQpbTYpgldcvoG2FwbjPi0qHS9L5SZQ11njYtU009ZPQL3TlvYCrZ';
  

// Колекція порід
export function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const ENDPOINT = 'breeds';
  const API_KEY =
    'live_iDoiV0EHJllOQpbTYpgldcvoG2FwbjPi0qHS9L5SZQ11njYtU009ZPQL3TlvYCrZ';

//   const params = new URLSearchParams({
//     api_key: API_KEY,
//   });
    
//   return fetch(`${BASE_URL}/${ENDPOINT}?${params}`).then(response => {
//     if (!response.ok) {
//       throw new Error('Breeds not found!');
//     }
//     return response.json();
    //   });
    
    return axios
      .get(`${BASE_URL}/${ENDPOINT}`)
      .then(({ data }) => data);
}; 

// Інформація про кота
export function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const ENDPOINT = 'images/search';
  const API_KEY =
    'live_iDoiV0EHJllOQpbTYpgldcvoG2FwbjPi0qHS9L5SZQ11njYtU009ZPQL3TlvYCrZ';

  const params = new URLSearchParams({
    // api_key: API_KEY,
    breed_ids: breedId,
  });

//   return fetch(`${BASE_URL}/${ENDPOINT}?${params}`).then(response => {
//     if (!response.ok) {
//       throw new Error('Breeds not found!');
//     }
//     return response.json();
//   });
    
    return axios
      .get(`${BASE_URL}/${ENDPOINT}?${params}`)
      .then(({ data }) => data);
}


// function fetchCatByBreed(id) {
//     const BASE_URL = 'https://api.thecatapi.com/v1';
//     const ENDPOINT = 'images/search';
//     const API_KEY = 'live_iDoiV0EHJllOQpbTYpgldcvoG2FwbjPi0qHS9L5SZQ11njYtU009ZPQL3TlvYCrZ';
     
//     const params = new URLSearchParams({
//         api_key: API_KEY,
//         breed_ids: id
//     });

//     return fetch(`${BASE_URL}/${ENDPOINT}?${params}`).then((response) => {
//          if (!response.ok) {
//             throw new Error("Breeds not found!");
//         }
//         return response.json()
//     });
// }

// function fetchBreeds() {
//   const BASE_URL = 'https://api.thecatapi.com/v1';
//   const ENDPOINT = 'breeds';
//   const API_KEY =
//     'live_iDoiV0EHJllOQpbTYpgldcvoG2FwbjPi0qHS9L5SZQ11njYtU009ZPQL3TlvYCrZ';

//   const params = new URLSearchParams({
//     api_key: API_KEY,
//   });
//   return fetch(`${BASE_URL}/${ENDPOINT}?${params}`).then(response => {
//     if (!response.ok) {
//       throw new Error('Breeds not found!');
//     }
//     return response.json();
//   });
// }



