const fetchHourlyWeatherData = async function fetchHourlyWeatherData(lat, lon, APIKey, units) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,daily,minutely,alerts&appid=${APIKey}&units=${units}`);
    const data = await response.json();
    const hourlyWeatherData = { timezone: data.timezone, hours: [], uvi: data.hourly[0].uvi };
    data.hourly.every((element, index) => {
      if (index === 24) return false;
      hourlyWeatherData.hours[index] = {
        dt: element.dt,
        temp: element.temp,
        icon: element.weather[0].icon,
      };
      return true;
    });
    return hourlyWeatherData;
  } catch (error) {
    return false;
  }
};

export default fetchHourlyWeatherData;
