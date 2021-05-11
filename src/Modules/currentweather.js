const fetchCurrentWeatherData = async function fetchCurrentWeatherData(city, APIKey, units) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=${units}`, { mode: 'cors' });
    const data = await response.json();
    const currentWeatherData = {
      coord: data.coord, // returns { lat, long }
      main: data.main, // returns { feels_like, humidity, pressure, temp, temp_max, temp_min }
      name: data.name, // returns 'name'
      sys: data.sys, // returns { country, id, sunrise, sunset, type }
      weather: data.weather[0], // returns { description, icon, id, main }
      wind: data.wind, // returns { deg, speed }
    };
    return currentWeatherData;
  } catch (error) {
    return false;
  }
};

export default fetchCurrentWeatherData;
