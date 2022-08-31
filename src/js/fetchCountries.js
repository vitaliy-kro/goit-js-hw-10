export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(value => {
    if (!value.ok) {
      throw new Error(value.status);
    }
    return value.json();
  });
}
