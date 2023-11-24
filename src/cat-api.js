// import axios from 'axios';

// axios.defaults.headers.common['x-api-key'] =
//     'live_iDoiV0EHJllOQpbTYpgldcvoG2FwbjPi0qHS9L5SZQ11njYtU009ZPQL3TlvYCrZ';
  
const refs = {
    selector: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'), 
    error: document.querySelector('.error'),
    div: document.querySelector('.cat-info')
}

fetchBreeds().then(data => {
    const markup = createSelectorMarkup(data);
    refs.selector.innerHTML = markup;
    // console.log(markup)
}
    ).catch(error => console.log(error))



refs.selector.addEventListener('change', onBreedSelect);

function onBreedSelect(event) {
    const id = event.target.value;
    fetchCatByBreed(id)
        .then(data => {
            refs.div.innerHTML = createDescriptionMarkup(data);
            console.log(createDescriptionMarkup(data))
        })
      .catch(err => console.log(err));
    
    

}


function createDescriptionMarkup(arr) {
  return arr
    .map(
      ({ url, breeds }) => `
     <img src="${url}" alt="${breeds[0].name}" class="cat-image">
     <h1 class="cat-name">${breeds[0].name}</h1>
     <h2 class="cat-temperament">${breeds[0].temperament}</h2>
     <h3 class="cat-description">${breeds[0].description}</h3>`
    )
    .join('');
}

function fetchCatByBreed(id) {
    const BASE_URL = 'https://api.thecatapi.com/v1';
    const ENDPOINT = 'images/search';
    const API_KEY = 'live_iDoiV0EHJllOQpbTYpgldcvoG2FwbjPi0qHS9L5SZQ11njYtU009ZPQL3TlvYCrZ';
     
    const params = new URLSearchParams({
        api_key: API_KEY,
        breed_ids: id
    });

    return fetch(`${BASE_URL}/${ENDPOINT}?${params}`).then((response) => {
         if (!response.ok) {
            throw new Error("Breeds not found!");
        }
        return response.json()
    });
}

function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const ENDPOINT = 'breeds';
  const API_KEY =
    'live_iDoiV0EHJllOQpbTYpgldcvoG2FwbjPi0qHS9L5SZQ11njYtU009ZPQL3TlvYCrZ';

  const params = new URLSearchParams({
    api_key: API_KEY,
  });
  return fetch(`${BASE_URL}/${ENDPOINT}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error('Breeds not found!');
    }
    return response.json();
  });
}

function createSelectorMarkup(arr) {
  return arr
    .map(
      ({ id, name }) => `
     <option value="${id}">${name}</option>`
    )
    .join('');
}