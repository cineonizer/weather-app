import config from './config';
import {
  capitalizeDescription,
  convertToCelsius,
  convertToFahrenheit,
} from './helper';
import fetchCurrentWeatherData from './currentweather';

const searchBar = document.querySelector('.search-input');
const unitsToggleBtn = document.querySelector('.unit-toggle');
const cityNameDiv = document.querySelector('.city-title');
const weatherDegDiv = document.querySelector('.weather-degrees');
const weatherDescDiv = document.querySelector('.weather-description');

let units = 'imperial';
let weatherData = {};

const setCityName = function setCityNameUsingWeatherData(city) {
  cityNameDiv.textContent = city;
};

const setWeatherDescription = function setWeatherDescriptionUsingWeatherData(description) {
  weatherDescDiv.textContent = capitalizeDescription(description);
};

const setWeatherDegrees = function setWeatherDegreesUsingWeatherData(degrees) {
  weatherDegDiv.textContent = `${Math.floor(degrees)}\u00B0`;
};

const displayWeather = function displayWeatherAfterUserSearches() {
  searchBar.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      weatherData = await fetchCurrentWeatherData(searchBar.value, config.API_KEY, units);
      setCityName(weatherData.name);
      setWeatherDegrees(weatherData.main.temp);
      setWeatherDescription(weatherData.weather.description);
    }
  });
};

const toggleUnits = function toggleImperialOrMetric() {
  units = unitsToggleBtn.checked ? 'imperial' : 'metric';
  weatherData.main.temp = (units === 'imperial') ? convertToFahrenheit(weatherData.main.temp) : convertToCelsius(weatherData.main.temp);
};

unitsToggleBtn.addEventListener('click', () => {
  toggleUnits();
  setWeatherDegrees(weatherData.main.temp);
});

export default displayWeather;
