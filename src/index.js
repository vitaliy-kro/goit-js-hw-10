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
    const trimmedValue = e.target.value.trim();
    if (trimmedValue === '') return;
    fetchCountries(trimmedValue)
      .then(value => {
        if (!value.ok) {
          throw new Error(value.status);
        }
        return value.json();
      })
      .then(result => {
        if (result.length >= 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }
        if (result.length === 1) {
          return createMarkupToDescription(result);
        }
        return createMarkupToList(result);
      })
      .then(e => {
        if (!e) {
          return;
        }
        countryListRef.innerHTML = '';
        countryInfoRef.innerHTML = '';
        e.includes('country-list__item')
          ? countryListRef.insertAdjacentHTML('beforeend', e)
          : countryInfoRef.insertAdjacentHTML('beforeend', e);
      })
      .catch(e => {
        console.log(e);
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }, DEBOUNCE_DELAY)
);
