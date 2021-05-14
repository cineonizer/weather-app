import fromUnixTime from 'date-fns/fromUnixTime';
import { utcToZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';

const getDescription = function capitalizeFirstCharOfWeatherDescription(lowerDescription) {
  let descrArr = lowerDescription.split(' ');
  descrArr = descrArr.map((word) => word[0].toUpperCase() + word.slice(1));
  const upperDescription = descrArr.join(' ');
  return upperDescription;
};

const getCelsius = function convertToCelsiusFromFahrenheit(fahrenheit) {
  const celsius = (fahrenheit - 32) * (5 / 9);
  return celsius;
};

const getFahrenheit = function convertToFahrenheitFromCelsius(Celsius) {
  const fahrenheit = (Celsius * (9 / 5)) + 32;
  return fahrenheit;
};

const getTime = function convertUnixToLocalHour(timestamp, timezone) {
  const date = fromUnixTime(timestamp);
  const localDate = utcToZonedTime(date, timezone);
  const localDay = format(localDate, 'eeee');
  let localHour = localDate.getHours();
  const meridiem = (localHour < 12) ? 'AM' : 'PM';
  if (localHour > 12) localHour -= 12;
  else if (localHour === 0) localHour = 12;
  return [localHour, meridiem, localDay];
};

export {
  getDescription,
  getCelsius,
  getFahrenheit,
  getTime,
};
