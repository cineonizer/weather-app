import config from './config';
import {
  capitalizeDescription,
  convertToCelsius,
  convertToFahrenheit,
} from './helper';
import fetchCurrentWeatherData from './currentweather';
import fetchHourlyWeatherData from './hourlyweather';

const searchBar = document.querySelector('.search-input');
const unitsToggleBtn = document.querySelector('.unit-toggle');
const cityNameDiv = document.querySelector('.city-title');
const weatherDegDiv = document.querySelector('.weather-degrees');
const weatherDescDiv = document.querySelector('.weather-description');

let units = 'imperial';
let currentWeatherData = {};
let hourlyWeatherData = {};

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
      currentWeatherData = await fetchCurrentWeatherData(searchBar.value, config.API_KEY, units);
      hourlyWeatherData = await fetchHourlyWeatherData(
        currentWeatherData.lat,
        currentWeatherData.lon,
        config.API_KEY,
        units,
      );
      if (currentWeatherData) {
        setCityName(currentWeatherData.name);
        setWeatherDegrees(currentWeatherData.temp);
        setWeatherDescription(currentWeatherData.description);
      }
    }
  });
};

const toggleUnits = function toggleImperialOrMetric() {
  units = unitsToggleBtn.checked ? 'imperial' : 'metric';
  currentWeatherData.temp = (units === 'imperial') ? convertToFahrenheit(currentWeatherData.temp) : convertToCelsius(currentWeatherData.temp);
};

unitsToggleBtn.addEventListener('click', () => {
  toggleUnits();
  setWeatherDegrees(currentWeatherData.temp);
});

export default displayWeather;
