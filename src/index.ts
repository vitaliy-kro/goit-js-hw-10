import './css/styles.css';
import Debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import {
  createMarkupToDescription,
  createMarkupToList,
} from './js/createMarkup';
import { Country } from './types/countries.types';

const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector('#search-box')!;
const countryListRef = document.querySelector('.country-list')!;
const countryInfoRef = document.querySelector('.country-info')!;

inputRef.addEventListener(
  'input',
  Debounce(async (e: Event) => {
    clearMarkup();
    try {
      const trimmedValue = (e.target as HTMLInputElement).value.trim();
      if (!trimmedValue) return;
      const fetchedCountries = await fetchCountries(trimmedValue);
      const checkedElements = checkFetchedElementsLength(fetchedCountries);
      if (checkedElements) addingElementsToDOM(checkedElements);
    } catch (error) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    }
  }, DEBOUNCE_DELAY)
);

function checkFetchedElementsLength(countries: [Country]) {
  return countries.length >= 10
    ? toManyMatchesNotification()
    : updateMarkup(countries);
}

function clearMarkup() {
  countryListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';
}

function updateMarkup(element: [Country]) {
  if (element.length === 1) {
    return createMarkupToDescription(element);
  }
  return createMarkupToList(element);
}

function addingElementsToDOM(element: string) {
  element.includes('country-list__item')
    ? countryListRef.insertAdjacentHTML('beforeend', element)
    : countryInfoRef.insertAdjacentHTML('beforeend', element);
}

function toManyMatchesNotification() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
