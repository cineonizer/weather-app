const fetchHourlyWeatherData = async function fetchHourlyWeatherData(lat, long, APIKey, units) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,daily,minutely,alerts&appid=${APIKey}&units=${units}`);
    const data = await response.json();
    const hourlyWeatherData = {};
    data.hourly.forEach((element, index) => {
      hourlyWeatherData[index] = {
        dt: element.dt,
        temp: element.temp,
        icon: element.weather[0].icon,
      };
    });
    return hourlyWeatherData;
  } catch (error) {
    return false;
  }
};

export default fetchHourlyWeatherData;
