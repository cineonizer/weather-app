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
  const localMinutes = (localDate.getMinutes() < 10 ? '0' : '') + localDate.getMinutes();
  const meridiem = (localHour < 12) ? 'AM' : 'PM';
  if (localHour > 12) localHour -= 12;
  else if (localHour === 0) localHour = 12;
  return [localHour, localMinutes, meridiem, localDay];
};

const getWindDirection = function convertDegreeDirectionToCardinal(degrees) {
  switch (true) {
    case degrees > 11.25 && degrees <= 33.75: {
      return 'NNE';
    }
    case degrees > 33.75 && degrees <= 56.25: {
      return 'NE';
    }
    case degrees > 56.25 && degrees <= 78.75: {
      return 'ENE';
    }
    case degrees > 78.75 && degrees <= 101.25: {
      return 'E';
    }
    case degrees > 101.25 && degrees <= 123.75: {
      return 'ESE';
    }
    case degrees > 123.75 && degrees <= 146.25: {
      return 'SE';
    }
    case degrees > 146.25 && degrees <= 168.75: {
      return 'SSE';
    }
    case degrees > 168.75 && degrees <= 191.25: {
      return 'S';
    }
    case degrees > 191.25 && degrees <= 213.75: {
      return 'SSW';
    }
    case degrees > 213.75 && degrees <= 236.25: {
      return 'SW';
    }
    case degrees > 236.25 && degrees <= 258.75: {
      return 'WSW';
    }
    case degrees > 258.75 && degrees <= 281.25: {
      return 'W';
    }
    case degrees > 281.25 && degrees <= 303.75: {
      return 'WNW';
    }
    case degrees > 303.75 && degrees <= 326.25: {
      return 'NW';
    }
    case degrees > 326.25 && degrees <= 348.75: {
      return 'NNW';
    }
    default: {
      return 'N';
    }
  }
};

const getMilesPerHour = function convertMetersPerSecToMilesPerHour(metersPerSec) {
  return Math.round((metersPerSec * 2.237) * 100) / 100;
};

const createFooterCell = function createFooterCellHelperFn(footerDiv, title, value) {
  const cellDiv = document.createElement('div');
  const titleDiv = document.createElement('div');
  const valueDiv = document.createElement('div');

  cellDiv.classList.add('cell');
  footerDiv.appendChild(cellDiv);

  titleDiv.classList.add('title');
  titleDiv.textContent = title;
  cellDiv.appendChild(titleDiv);

  valueDiv.classList.add('value');
  valueDiv.textContent = value;
  cellDiv.appendChild(valueDiv);
};

const getInchOfMercury = function convertAtmosphericToMercuryPressure(hpa) {
  return Math.round((hpa / 33.863886666667) * 100) / 100;
};

const getMiles = function convertMetersToMiles(meters) {
  return Math.round(meters / 1609.344);
};

export {
  getDescription,
  getCelsius,
  getFahrenheit,
  getTime,
  getWindDirection,
  getMilesPerHour,
  createFooterCell,
  getInchOfMercury,
  getMiles,
};
