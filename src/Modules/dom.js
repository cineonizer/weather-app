import { getDescription, createFooterCell } from './helper';

const cityNameDiv = document.querySelector('.city-title');
const weatherDegDiv = document.querySelector('.weather-degrees');
const weatherDescDiv = document.querySelector('.weather-description');
const allHoursDiv = document.querySelector('.all-hours');
const todayDiv = document.querySelector('.today');
const allDaysDiv = document.querySelector('.all-days');
const footerDiv = document.querySelector('.footer-container');
const stickerDiv = document.querySelector('.sticker-gif');

const setCityName = function setCurrentCityName(city) {
  cityNameDiv.textContent = city;
};

const setWeatherDescription = function setCurrentWeatherDescription(description) {
  weatherDescDiv.textContent = getDescription(description);
};

const setWeatherDegrees = function setCurrentWeatherDegrees(degrees) {
  weatherDegDiv.textContent = `${Math.floor(degrees)}\u00B0`;
};

const setWeatherHours = function setHourlyWeatherTime(time, icon, degrees) {
  const [hour, meridiem] = [time[0], time[2]];
  const weatherHourContainerDiv = document.createElement('div');
  const hourDiv = document.createElement('div');
  const merdiemSpan = document.createElement('span');
  const imgDiv = document.createElement('img');
  const hourlyweatherDiv = document.createElement('div');

  weatherHourContainerDiv.classList.add('weather-hour');

  hourDiv.classList.add('hour');
  hourDiv.textContent = hour;
  weatherHourContainerDiv.appendChild(hourDiv);

  merdiemSpan.classList.add('meridiem');
  merdiemSpan.textContent = meridiem;
  hourDiv.appendChild(merdiemSpan);

  imgDiv.classList.add('icon');
  imgDiv.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  weatherHourContainerDiv.appendChild(imgDiv);

  hourlyweatherDiv.classList.add('hourly-weather');
  hourlyweatherDiv.textContent = `${Math.floor(degrees)}\u00B0`;
  weatherHourContainerDiv.appendChild(hourlyweatherDiv);

  allHoursDiv.appendChild(weatherHourContainerDiv);
};

const setWeatherDays = function setDailyWeatherDays(time, icon, dayDegrees, nightDegrees) {
  const day = time[3];
  const weatherDayContainerDiv = document.createElement('div');
  const dayDiv = document.createElement('div');
  const imgDiv = document.createElement('img');
  const dailyWeatherDiv = document.createElement('div');
  const dayWeatherDiv = document.createElement('div');
  const nightWeatherDiv = document.createElement('div');

  weatherDayContainerDiv.classList.add('weather-day');

  dayDiv.classList.add('day');
  dayDiv.textContent = day;
  weatherDayContainerDiv.appendChild(dayDiv);

  imgDiv.classList.add('icon');
  imgDiv.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  weatherDayContainerDiv.appendChild(imgDiv);

  dailyWeatherDiv.classList.add('daily-weather');
  weatherDayContainerDiv.appendChild(dailyWeatherDiv);

  dayWeatherDiv.classList.add('daytime-weather');
  dayWeatherDiv.textContent = `${Math.floor(dayDegrees)}\u00B0`;
  dailyWeatherDiv.appendChild(dayWeatherDiv);

  nightWeatherDiv.classList.add('nighttime-weather');
  nightWeatherDiv.textContent = `${Math.floor(nightDegrees)}\u00B0`;
  dailyWeatherDiv.appendChild(nightWeatherDiv);

  allDaysDiv.appendChild(weatherDayContainerDiv);
};

const setToday = function setTodayOfTheWeek(time) {
  const today = time[3];
  todayDiv.textContent = today;
};

const setSunrise = function setSunriseDiv(time) {
  const [hour, minutes, meridiem] = [time[0], time[1], time[2]];
  createFooterCell(footerDiv, 'SUNRISE', `${hour}:${minutes}${meridiem}`);
};

const setSunset = function setSunsetDiv(time) {
  const [hour, minutes, meridiem] = [time[0], time[1], time[2]];
  createFooterCell(footerDiv, 'SUNSET', `${hour}:${minutes}${meridiem}`);
};

const setHumidity = function setHumdityDiv(humidity) {
  createFooterCell(footerDiv, 'HUMIDITY', `${humidity}%`);
};

const setWind = function setWindDirectionAndDegree(windDirection, windSpeed) {
  createFooterCell(footerDiv, 'WIND', `${windDirection} ${windSpeed} mph`);
};

const setFeelsLike = function setFeelsLikeTemp(feels) {
  createFooterCell(footerDiv, 'FEELS LIKE', `${Math.floor(feels)}\u00B0`);
};

const setPressure = function setPressure(pressure) {
  createFooterCell(footerDiv, 'PRESSURE', `${pressure} inHg`);
};

const setVisibility = function setVisibility(visilbity) {
  createFooterCell(footerDiv, 'VISIBILITY', `${visilbity} mi`);
};

const setUVI = function setUVIndex(uvi) {
  createFooterCell(footerDiv, 'UV INDEX', `${uvi}`);
};

const setSticker = function setStickerGIF(stickerURL) {
  stickerDiv.src = stickerURL;
};

const resetWeatherHours = function resetAllHourlyWeatherDivs() {
  allHoursDiv.innerHTML = '';
};

const resetWeatherDays = function resetAllDailyWeatherDivs() {
  allDaysDiv.innerHTML = '';
};

const resetFooterInfo = function resetAllFooterDivs() {
  footerDiv.innerHTML = '';
};

export {
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
};
