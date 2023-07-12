export function fetchCountries(name: string) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(value => {
    if (!value.ok) {
      throw new Error(value.status.toString());
    }
    return value.json();
  });
}
