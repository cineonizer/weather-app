import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';
import { utcToZonedTime } from 'date-fns-tz';

const capitalizeDescription = function capitalizeFirstCharOfWeatherDescription(lowerDescription) {
  let descrArr = lowerDescription.split(' ');
  descrArr = descrArr.map((word) => word[0].toUpperCase() + word.slice(1));
  const upperDescription = descrArr.join(' ');
  return upperDescription;
};

const convertToCelsius = function convertToCelsiusFromFahrenheit(fahrenheit) {
  const celsius = (fahrenheit - 32) * (5 / 9);
  return celsius;
};

const convertToFahrenheit = function convertToFahrenheitFromCelsius(Celsius) {
  const fahrenheit = (Celsius * (9 / 5)) + 32;
  return fahrenheit;
};

const convertUnix = function convertUnixToHour(unix, timezone) {
  const date = fromUnixTime(unix);
  console.log(date.toLocaleString());
  const localDate = utcToZonedTime(date, timezone);
  console.log(localDate);
};

export {
  capitalizeDescription,
  convertToCelsius,
  convertToFahrenheit,
  convertUnix,
};
