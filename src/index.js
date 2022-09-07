import './css/styles.css';
import Debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import {
  createMarkup,
  createMarkupToDescription,
  createMarkupToList,
} from './js/createMarkup';
const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener(
  'input',
  Debounce(async e => {
    clearMarkup();
    try {
      const trimmedValue = e.target.value.trim();
      if (!trimmedValue) return;
      const fetchedCountries = await fetchCountries(trimmedValue);

      const checkFetchedElementsLength =
        fetchedCountries.length >= 10
          ? ForToManyMatchesMessage()
          : updateMarkup(fetchedCountries);

      if (!checkFetchedElementsLength) return;
      clearMarkup();
      addingElementsToDOM(checkFetchedElementsLength);
    } catch (error) {
      console.log(e);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    }
    // fetchCountries(trimmedValue)
    //   .then(result => {
    //     if (result.length >= 10) {
    //       return ForToManyMatchesMessage();
    //     }
    //     return updateMarkup(result);
    //   })
    //   .then(e => {
    //     console.log(e);
    //     if (!e) {
    //       return;
    //     }
    //     clearMarkup();
    //     addingElementsToDOM(e);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     Notiflix.Notify.failure('Oops, there is no country with that name');
    //   });
  }, DEBOUNCE_DELAY)
);

function clearMarkup() {
  countryListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';
}

function updateMarkup(element) {
  if (element.length === 1) {
    return createMarkupToDescription(element);
  }
  return createMarkupToList(element);
}

function addingElementsToDOM(element) {
  element.includes('country-list__item')
    ? countryListRef.insertAdjacentHTML('beforeend', element)
    : countryInfoRef.insertAdjacentHTML('beforeend', element);
}
function ForToManyMatchesMessage() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
