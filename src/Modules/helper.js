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

export { capitalizeDescription, convertToCelsius, convertToFahrenheit };
