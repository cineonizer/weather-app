// eslint-disable-next-line import/named
import { config } from './Modules/config';

const searchBar = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-button');

const fetchWeather = async () => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&appid=${config.APIKey}&units=${config.units}`, { mode: 'cors' });
  const weatherData = await response.json();
  return weatherData.main;
};

searchBtn.addEventListener('click', fetchWeather);
