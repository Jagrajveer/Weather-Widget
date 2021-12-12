const API_TOKEN = "ff5ab50e290723493fcd206af6bc109a";

async function getCurrentWeatherData(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_TOKEN}`;
  const data = await (await fetch(url)).json();
  return data;
}

async function getFiveDayWeatherData(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_TOKEN}`;
  const data = await (await fetch(url)).json();
  return data;
}

function convertKelvinToCelcius(temp) {
  return (temp - 273.15).toFixed(0);
}

navigator.geolocation.getCurrentPosition(
  ({ coords: { latitude, longitude } }) => {
    getCurrentWeatherData(latitude, longitude)
      .then((data) => {
        console.log(convertKelvinToCelcius(data.main.temp));
      })
      .catch((error) => console.log(error));

    getFiveDayWeatherData(latitude, longitude);
  }
);
