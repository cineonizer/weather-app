import config from './Modules/config';
import fetchCurrentWeatherData from './Modules/currentweather';
import fetchHourlyWeatherData from './Modules/hourlyweather';
import { getCelsius, getFahrenheit, getTime } from './Modules/helper';
import {
  setCityName,
  setWeatherDegrees,
  setWeatherDescription,
  setWeatherTime,
  resetWeatherTime,
  setDay,
} from './Modules/dom';

const searchBar = document.querySelector('.search-input');
const unitsToggleBtn = document.querySelector('.unit-toggle');

let units = 'imperial';
let currentWeatherData = {};
let hourlyWeatherData = {};

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
      resetWeatherTime();
      setCityName(currentWeatherData.name);
      setWeatherDegrees(currentWeatherData.temp);
      setWeatherDescription(currentWeatherData.description);
      setDay(getTime(hourlyWeatherData.hours[0].dt, hourlyWeatherData.timezone));
      hourlyWeatherData.hours.forEach((element) => {
        setWeatherTime(getTime(element.dt, hourlyWeatherData.timezone), element.icon, element.temp);
      });
    }
  }
});

const toggleUnits = function toggleImperialOrMetric() {
  units = unitsToggleBtn.checked ? 'imperial' : 'metric';
  currentWeatherData.temp = (units === 'imperial') ? getFahrenheit(currentWeatherData.temp) : getCelsius(currentWeatherData.temp);
  hourlyWeatherData.hours.forEach((element) => {
    const hourWeather = element;
    hourWeather.temp = (units === 'imperial') ? getFahrenheit(hourWeather.temp) : getCelsius(hourWeather.temp);
  });
};

unitsToggleBtn.addEventListener('click', () => {
  resetWeatherTime();
  toggleUnits();
  setWeatherDegrees(currentWeatherData.temp);
  hourlyWeatherData.hours.forEach((element) => {
    setWeatherTime(getTime(element.dt, hourlyWeatherData.timezone), element.icon, element.temp);
  });
});
