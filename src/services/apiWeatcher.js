export const fetchWeatherDetails = (location) =>
  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`);
