// documentation codes
// https://www.meteomatics.com/en/api/available-parameters/derived-weather-and-convenience-parameters/general-weather-state/#ww100
const weatherCodes = {
  0: "Non determined",
  1: "Clear sky",
  2: "Light clouds",
  3: "Partly cloudy",
  4: "Cloudy",
  5: "Rain",
  6: "Rain and snow / sleet",
  7: "Snow",
  8: "Rain shower",
  9: "Snow shower",
  10: "Sleet shower",
  11: "Light Fog",
  12: "Dense fog",
  13: "Freezing rain",
  14: "Thunderstorms",
  15: "Drizzle",
  16: "Sandstorm",
};

const formatDate = (date, hoursInMs) => {
  const h = Math.round(hoursInMs / 3600 / 1000);
  const m = (hoursInMs / 60 / 1000) % 60;
  console.log(date, hoursInMs, h, m);
  const timestamp = new Date(date).setHours(h, m);

  return new Date(timestamp).toISOString();
};

const getWeather = async (city, date, time) => {
  const latLongResponse = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=e04040e27f92e36db440fe9a03d4be1e`
  );

  const coordinates = await latLongResponse.json();

  const [{ lat, lon }] = coordinates;

  // return Promise.resolve(weatherCodes[1]);

  const weatherRes = await fetch(
    `https://api.meteomatics.com/${formatDate(
      date,
      time
    )}/weather_symbol_1h:idx/${lat},${lon}/json`,
    {
      headers: new Headers({
        Authorization:
          "Basic bHVjYXN3YXVrZXNlcnZpY29zZGVpbmZvcm1hdGljYV93YXVrZTplOGlqNTVUMUxO",
      }),
    }
  );

  const weather = await weatherRes.json();

  const code = weather ? weather.data[0].coordinates[0].dates[0].value : "0";

  return weatherCodes[`${code}`.slice(-1)];
};

export default getWeather;
