import { getDescription } from './helper';

const cityNameDiv = document.querySelector('.city-title');
const weatherDegDiv = document.querySelector('.weather-degrees');
const weatherDescDiv = document.querySelector('.weather-description');
const allHoursDiv = document.querySelector('.all-hours');
const dayDiv = document.querySelector('.day');

const setCityName = function setCurrentCityName(city) {
  cityNameDiv.textContent = city;
};

const setWeatherDescription = function setCurrentWeatherDescription(description) {
  weatherDescDiv.textContent = getDescription(description);
};

const setWeatherDegrees = function setCurrentWeatherDegrees(degrees) {
  weatherDegDiv.textContent = `${Math.floor(degrees)}\u00B0`;
};

const setWeatherTime = function setHourlyWeatherTime(time, iconID, degrees) {
  const [hour, meridiem] = [time[0], time[1]];
  const weatherHourContainerDiv = document.createElement('div');
  const hourDiv = document.createElement('div');
  const merdiemSpan = document.createElement('span');
  const imgDiv = document.createElement('img');
  const weatherDiv = document.createElement('div');

  weatherHourContainerDiv.classList.add('weather-hour');

  hourDiv.classList.add('hour');
  hourDiv.textContent = hour;
  weatherHourContainerDiv.appendChild(hourDiv);

  merdiemSpan.classList.add('meridiem');
  merdiemSpan.textContent = meridiem;
  hourDiv.appendChild(merdiemSpan);

  imgDiv.classList.add('icon');
  imgDiv.src = `http://openweathermap.org/img/wn/${iconID}@2x.png`;
  weatherHourContainerDiv.appendChild(imgDiv);

  weatherDiv.classList.add('weather');
  weatherDiv.textContent = `${Math.floor(degrees)}\u00B0`;
  weatherHourContainerDiv.appendChild(weatherDiv);

  allHoursDiv.appendChild(weatherHourContainerDiv);
};

const resetWeatherTime = function resetAllHourlyWeatherDivs() {
  allHoursDiv.innerHTML = '';
};

const setDay = function setDayOfTheWeek(time) {
  const day = time[2];
  dayDiv.textContent = day;
};

export {
  setCityName,
  setWeatherDegrees,
  setWeatherDescription,
  setWeatherTime,
  resetWeatherTime,
  setDay,
};
