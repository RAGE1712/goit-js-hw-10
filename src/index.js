import axios from 'axios';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-aio-3.2.6.min.js';
import SlimSelect from 'slim-select'
import { fetchCatByBreed, fetchBreeds } from './cat-api';

// axios.defaults.headers.common['x-api-key'] = 'live_iDoiV0EHJllOQpbTYpgldcvoG2FwbjPi0qHS9L5SZQ11njYtU009ZPQL3TlvYCrZ';
// new SlimSelect({
//   select: '#selectElement'
// })

// console.log(axios.isCancel('something'));

const refs = {
  selector: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  div: document.querySelector('.cat-info'),
};

fetchBreeds()
  .then(data => {
    const markup = createSelectorMarkup(data);
    refs.selector.innerHTML = markup;
    // console.log(markup)
  })
    .catch(error => console.log(error));

function createSelectorMarkup(arr) {
      return arr
        .map(
          ({ id, name }) => `
     <option value="${id}">${name}</option>`
        )
        .join('');
}
    
//!===========================Descriprion================================= !// 

refs.selector.addEventListener('change', onBreedSelect);

function onBreedSelect(event) {
  const id = event.target.value;
  fetchCatByBreed(id)
    .then(data => {
      refs.div.innerHTML = createDescriptionMarkup(data);
      // console.log(createDescriptionMarkup(data))
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


