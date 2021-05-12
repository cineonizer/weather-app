const fetchCurrentWeatherData = async function fetchCurrentWeatherData(city, APIKey, units) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=${units}`, { mode: 'cors' });
    const data = await response.json();
    const currentWeatherData = {
      lat: data.coord.lat,
      lon: data.coord.lon,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      temp: data.main.temp,
      tempMax: data.main.temp_max,
      tempMin: data.main.temp_min,
      name: data.name,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      winDeg: data.wind.deg,
      winSpeed: data.wind.speed,
    };
    return currentWeatherData;
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert('No city found');
    return false;
  }
};

export default fetchCurrentWeatherData;