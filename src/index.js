import './css/styles.css';
import Debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
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
          return result
            .map(
              element => `<img width="40" height="30" src="${
                element.flags.svg
              }"/><h1 class="country-info__name">${
                element.name['official']
              }</h1><ul class="country-info__list">
        <li class="country-info__item">
          <h3>Capital:</h3>
          <p class="country-info__description">${element.capital}</p>
        </li>
        <li class="country-info__item">
          <h3>Population:</h3>
          <p class="country-info__description">${element.population}</p>
        </li>
        <li class="country-info__item">
          <h3>Languages:</h3>
          <p class="country-info__description">${Object.values(
            element.languages
          )}</p>
        </li>
      </ul>`
            )
            .join('');
        }
        return result
          .map(
            element =>
              `<li class="country-list__item"><img width=40 height=30 src="${element.flags.svg}"><h2 class="country-list__name">${element.name['official']}</h2></li>`
          )
          .join('');
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
