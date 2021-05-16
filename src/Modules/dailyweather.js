const fetchDailyWeatherData = async function fetchDailyWeatherData(lat, lon, APIKey, units) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${APIKey}&units=${units}`);
  const data = await response.json();
  const dailyWeatherData = { timezone: data.timezone, days: [] };
  data.daily.forEach((element, index) => {
    if (index === 0) return;
    dailyWeatherData.days[index] = {
      dt: element.dt,
      dayTemp: element.temp.day,
      nightTemp: element.temp.night,
      icon: element.weather[0].icon,
    };
  });
  return dailyWeatherData;
};

export default fetchDailyWeatherData;
