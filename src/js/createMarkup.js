export function createMarkupToDescription(country) {
  return country
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

export function createMarkupToList(countries) {
  return countries
    .map(
      element =>
        `<li class="country-list__item"><img width=40 height=30 src="${element.flags.svg}"><h2 class="country-list__name">${element.name['official']}</h2></li>`
    )
    .join('');
}
