import './css/styles.css';
import Debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import {
  createMarkupToDescription,
  createMarkupToList,
} from './js/createMarkup';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener(
  'input',
  Debounce(e => {
    clearMarkup();
    const trimmedValue = e.target.value.trim();
    if (!trimmedValue) return;
    fetchCountries(trimmedValue)
      .then(result => {
        if (result.length >= 10) {
          return ForToManyMatchesMessage();
        }
        return updateMarkup(result);
      })
      .then(e => {
        if (!e) {
          return;
        }
        clearMarkup();
        addingElementsToDOM(e);
      })
      .catch(e => {
        console.log(e);
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
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
  return Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
