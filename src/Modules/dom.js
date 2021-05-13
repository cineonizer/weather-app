import config from './config';
import {
  getDescription,
  getCelsius,
  getFahrenheit,
  getTime,
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

const setCityName = function setCurrentCityName(city) {
  cityNameDiv.textContent = city;
};

const setWeatherDescription = function setCurrentWeatherDescription(description) {
  weatherDescDiv.textContent = getDescription(description);
};

const setWeatherDegrees = function setCurrentWeatherDegrees(degrees) {
  weatherDegDiv.textContent = `${Math.floor(degrees)}\u00B0`;
};

const setWeatherTime = function setHourlyWeatherTime(time, iconID) {
  const [hour, meridiem] = [time[0], time[1]];
  const hourDiv = document.createElement('div');
  hourDiv.classList.add('hour');
  hourDiv.textContent = hour;

  const imgDiv = document.createElement('img');
  imgDiv.classList.add('icon');
  imgDiv.src = `http://openweathermap.org/img/wn/${iconID}@2x.png`;
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
        hourlyWeatherData.hours.forEach((element) => {
          console.log(getTime(element.dt, hourlyWeatherData.timezone));
          console.log(element.icon);
          console.log(element.temp);
        });
      }
    }
  });
};

const toggleUnits = function toggleImperialOrMetric() {
  units = unitsToggleBtn.checked ? 'imperial' : 'metric';
  currentWeatherData.temp = (units === 'imperial') ? getFahrenheit(currentWeatherData.temp) : getCelsius(currentWeatherData.temp);
};

unitsToggleBtn.addEventListener('click', () => {
  toggleUnits();
  setWeatherDegrees(currentWeatherData.temp);
});

export default displayWeather;
