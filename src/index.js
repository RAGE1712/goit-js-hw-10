import axios from 'axios';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-aio-3.2.6.min.js';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';

import { fetchCatByBreed, fetchBreeds } from './cat-api';

const refs = {
  selector: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  div: document.querySelector('.cat-info'),
};
// axios.defaults.headers.common['x-api-key'] = 'live_iDoiV0EHJllOQpbTYpgldcvoG2FwbjPi0qHS9L5SZQ11njYtU009ZPQL3TlvYCrZ';


// console.log(axios.isCancel('something'));


// refs.selector.classList.remove('is-hidden');
// refs.error.classList.add('is-hidden');

fetchBreeds()
  .then(data => {
    const markup = createSelectorMarkup(data);
    refs.error.classList.add('is-hidden');
    refs.selector.innerHTML = markup;
    refs.selector.classList.remove('is-hidden');
    refs.loader.classList.remove('loader');
    // console.log(markup)
    new SlimSelect({
      select: refs.selector,

      settings: {
        // Below are a list of optional fields
        // their values are the defaults
        disabled: false,
        alwaysOpen: false,
        showSearch: false,
        searchPlaceholder: '',
        searchText: '',
        searchingText: '',
        searchHighlight: false,
        closeOnSelect: true,
        // contentLocation: document.body,
        contentPosition: 'absolute',
        openPosition: 'auto', // options: auto, up, down
        placeholderText: '',
        allowDeselect: false,
        hideSelected: false,
        showOptionTooltips: false,
        minSelected: 0,
        maxSelected: 1000,
        timeoutDelay: 200,
        maxValuesShown: 20,
        maxValuesMessage: '{number} selected',
      },
    });
  })
    .catch(error => {
        refs.error.classList.remove('is-hidden');
            refs.selector.classList.add('is-hidden');
            refs.loader.classList.remove('loader');
        Notiflix.Notify.failure(
          `❌ Oops! Something went wrong! Try reloading the page! ❌`
        );
        console.log(error)
    });

    
//!===========================Descriprion================================= !// 

refs.selector.addEventListener('change', onBreedSelect);

function onBreedSelect(event) {
    const id = event.target.value;
    refs.error.classList.add('is-hidden');
    refs.div.classList.add('is-hidden');
    refs.loader.classList.add('loader');
    fetchCatByBreed(id)
        .then(data => {
            refs.div.innerHTML = createDescriptionMarkup(data);
            refs.div.classList.remove('is-hidden');
            refs.loader.classList.remove('loader');
            // console.log(createDescriptionMarkup(data))
        }
   
      )
      .catch(err => {
          refs.error.classList.remove('is-hidden');
           refs.selector.classList.add('is-hidden');
           refs.loader.classList.remove('loader');
          Notiflix.Notify.failure(
            `❌ Oops! Something went wrong! Try reloading the page! ❌`
          );
        console.log(err);
      });
   

}


        
function createDescriptionMarkup(arr) {
  return arr
    .map(
      ({ url, breeds }) => `
    <span class="cat-card">
     <img src="${url}" alt="${breeds[0].name}" class="cat-image">
     <span class="cat-descr">
     <h1 class="cat-name">${breeds[0].name}</h1>
     <h2 class="cat-temperament">${breeds[0].temperament}</h2>
     <p class="cat-description">${breeds[0].description}</p>
     </span></span>`
    )
    .join('');
}
function createSelectorMarkup(arr) {
  return arr
    .map(
      ({ id, name }) => `
     <option value="${id}">${name}</option>`
    )
    .join('');
}


//!===========================SlimSelect================================= !// 


