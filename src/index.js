import config from './Modules/config';
import fetchCurrentWeatherData from './Modules/currentweather';
import fetchHourlyWeatherData from './Modules/hourlyweather';
import fetchDailyWeatherData from './Modules/dailyweather';
import fetchStickerURL from './Modules/sticker';
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
  setSticker,
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
let stickerURL = '';

const setCurrentWeather = function setAllTheFunctionsOfCurrentWeather(currentWeather) {
  setCityName(currentWeather.name);
  setWeatherDegrees(currentWeather.temp);
  setWeatherDescription(currentWeather.description);
};

const setHourlyWeather = function setAllTheFunctionsOfHourlyWeather(hourlyWeather) {
  setToday(getTime(hourlyWeather.hours[0].dt, hourlyWeather.timezone));
  hourlyWeather.hours.forEach((element) => {
    setWeatherHours(getTime(element.dt, hourlyWeather.timezone), element.icon, element.temp);
  });
};

const setDailyWeather = function setAllTheFunctionsOfDailyWeather(dailyWeather) {
  dailyWeather.days.forEach((element) => {
    setWeatherDays(
      getTime(element.dt, dailyWeather.timezone),
      element.icon,
      element.dayTemp,
      element.nightTemp,
    );
  });
};

const setFooterInfo = function setAllFooterInformation(currentWeather, hourlyWeather) {
  setSunrise(getTime(currentWeather.sunrise, hourlyWeather.timezone));
  setSunset(getTime(currentWeather.sunset, hourlyWeather.timezone));
  setHumidity(currentWeather.humidity);
  setWind(getWindDirection(currentWeather.windDeg), currentWeather.windSpeed, units);
  setFeelsLike(currentWeather.feels_like);
  setPressure(getInchOfMercury(currentWeather.pressure));
  setVisibility(getMiles(currentWeather.visibility));
  setUVI(hourlyWeather.uvi);
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

const renderSampleWeather = async function onPageLoadSetLAWeather() {
  currentWeatherData = await fetchCurrentWeatherData('Los Angeles', config.WEATHER_KEY, units);
  hourlyWeatherData = await fetchHourlyWeatherData(
    currentWeatherData.lat,
    currentWeatherData.lon,
    config.WEATHER_KEY,
    units,
  );
  dailyWeatherData = await fetchDailyWeatherData(
    currentWeatherData.lat,
    currentWeatherData.lon,
    config.WEATHER_KEY,
    units,
  );
  stickerURL = await fetchStickerURL(currentWeatherData.description, config.GIF_KEY);
  resetWeatherHours();
  resetWeatherDays();
  resetFooterInfo();
  setCurrentWeather(currentWeatherData);
  setHourlyWeather(hourlyWeatherData);
  setDailyWeather(dailyWeatherData);
  setFooterInfo(currentWeatherData, hourlyWeatherData);
  setSticker(stickerURL);
};

window.addEventListener('load', () => renderSampleWeather());

searchBar.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    currentWeatherData = await fetchCurrentWeatherData(searchBar.value, config.WEATHER_KEY, units);
    hourlyWeatherData = await fetchHourlyWeatherData(
      currentWeatherData.lat,
      currentWeatherData.lon,
      config.WEATHER_KEY,
      units,
    );
    dailyWeatherData = await fetchDailyWeatherData(
      currentWeatherData.lat,
      currentWeatherData.lon,
      config.WEATHER_KEY,
      units,
    );
    stickerURL = await fetchStickerURL(currentWeatherData.description, config.GIF_KEY);
    if (currentWeatherData) {
      resetWeatherHours();
      resetWeatherDays();
      resetFooterInfo();
      setCurrentWeather(currentWeatherData);
      setHourlyWeather(hourlyWeatherData);
      setDailyWeather(dailyWeatherData);
      setFooterInfo(currentWeatherData, hourlyWeatherData);
      setSticker(stickerURL);
    }
  }
});

unitsToggleBtn.addEventListener('click', () => {
  resetWeatherHours();
  resetWeatherDays();
  resetFooterInfo();
  toggleUnits();
  setCurrentWeather(currentWeatherData);
  setHourlyWeather(hourlyWeatherData);
  setDailyWeather(dailyWeatherData);
  setFooterInfo(currentWeatherData, hourlyWeatherData);
});
