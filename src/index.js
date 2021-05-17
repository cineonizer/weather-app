import config from './Modules/config';
import fetchCurrentWeatherData from './Modules/currentweather';
import fetchHourlyWeatherData from './Modules/hourlyweather';
import fetchDailyWeatherData from './Modules/dailyweather';
import {
  getCelsius,
  getFahrenheit,
  getTime,
  getWindDirection,
  getInchOfMercury,
  getMiles,
} from './Modules/helper';
import {
  setCityName,
  setWeatherDescription,
  setWeatherDegrees,
  setWeatherHours,
  setWeatherDays,
  setToday,
  setSunrise,
  setSunset,
  setHumidity,
  setWind,
  setFeelsLike,
  setPressure,
  setVisibility,
  setUVI,
  resetWeatherHours,
  resetWeatherDays,
  resetFooterInfo,
} from './Modules/dom';

const searchBar = document.querySelector('.search-input');
const unitsToggleBtn = document.querySelector('.unit-toggle');

let units = 'imperial';
let currentWeatherData = {};
let hourlyWeatherData = {};
let dailyWeatherData = {};

const setCurrentWeather = function setAllTheFunctionsOfCurrentWeather() {
  setCityName(currentWeatherData.name);
  setWeatherDegrees(currentWeatherData.temp);
  setWeatherDescription(currentWeatherData.description);
};

const setHourlyWeather = function setAllTheFunctionsOfHourlyWeather() {
  setToday(getTime(hourlyWeatherData.hours[0].dt, hourlyWeatherData.timezone));
  hourlyWeatherData.hours.forEach((element) => {
    setWeatherHours(getTime(element.dt, hourlyWeatherData.timezone), element.icon, element.temp);
  });
};

const setDailyWeather = function setAllTheFunctionsOfDailyWeather() {
  dailyWeatherData.days.forEach((element) => {
    setWeatherDays(
      getTime(element.dt, dailyWeatherData.timezone),
      element.icon,
      element.dayTemp,
      element.nightTemp,
    );
  });
};

const setFooterInfo = function setAllFooterInformation() {
  setSunrise(getTime(currentWeatherData.sunrise, hourlyWeatherData.timezone));
  setSunset(getTime(currentWeatherData.sunset, hourlyWeatherData.timezone));
  setHumidity(currentWeatherData.humidity);
  setWind(getWindDirection(currentWeatherData.windDeg), currentWeatherData.windSpeed, units);
  setFeelsLike(currentWeatherData.feels_like);
  setPressure(getInchOfMercury(currentWeatherData.pressure));
  setVisibility(getMiles(currentWeatherData.visibility));
  setUVI(hourlyWeatherData.uvi);
};

const toggleUnits = function toggleImperialOrMetric() {
  units = unitsToggleBtn.checked ? 'imperial' : 'metric';
  currentWeatherData.temp = (units === 'imperial') ? getFahrenheit(currentWeatherData.temp) : getCelsius(currentWeatherData.temp);
  currentWeatherData.feels_like = (units === 'imperial') ? getFahrenheit(currentWeatherData.feels_like) : getCelsius(currentWeatherData.feels_like);
  hourlyWeatherData.hours.forEach((element) => {
    const hourlyWeather = element;
    hourlyWeather.temp = (units === 'imperial') ? getFahrenheit(hourlyWeather.temp) : getCelsius(hourlyWeather.temp);
  });
  dailyWeatherData.days.forEach((element) => {
    const dailyweather = element;
    dailyweather.dayTemp = (units === 'imperial') ? getFahrenheit(dailyweather.dayTemp) : getCelsius(dailyweather.dayTemp);
    dailyweather.nightTemp = (units === 'imperial') ? getFahrenheit(dailyweather.nightTemp) : getCelsius(dailyweather.nightTemp);
  });
};

searchBar.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    currentWeatherData = await fetchCurrentWeatherData(searchBar.value, config.API_KEY, units);
    hourlyWeatherData = await fetchHourlyWeatherData(
      currentWeatherData.lat,
      currentWeatherData.lon,
      config.API_KEY,
      units,
    );
    dailyWeatherData = await fetchDailyWeatherData(
      currentWeatherData.lat,
      currentWeatherData.lon,
      config.API_KEY,
      units,
    );
    if (currentWeatherData) {
      resetWeatherHours();
      resetWeatherDays();
      resetFooterInfo();
      setCurrentWeather();
      setHourlyWeather();
      setDailyWeather();
      setFooterInfo();
    }
  }
});

unitsToggleBtn.addEventListener('click', () => {
  resetWeatherHours();
  resetWeatherDays();
  resetFooterInfo();
  toggleUnits();
  setCurrentWeather();
  setHourlyWeather();
  setDailyWeather();
  setFooterInfo();
});
