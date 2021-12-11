const API_TOKEN = "ff5ab50e290723493fcd206af6bc109a";

async function getCurrentWeatherData(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_TOKEN}`;
  const data = await (await fetch(url)).json();
  return data;
}

navigator.geolocation.getCurrentPosition(
  ({ coords: { latitude, longitude } }) => {
    getCurrentWeatherData(latitude, longitude);
  }
);
