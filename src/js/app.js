// API key for openweather api
const API_TOKEN = "ff5ab50e290723493fcd206af6bc109a";

// Elements
const CurrentConditionElement = document.querySelector(".current-conditions");
const ForecastElement = document.querySelector(".forecast");

// function to fetch current weather data from openweather api
const getCurrentWeatherData = async (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_TOKEN}`;
  const data = await (await fetch(url)).json();
  return data;
};

// function to fetch five day weather data from openweather api
const getFiveDayWeatherData = async (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_TOKEN}`;
  const data = await (await fetch(url)).json();
  return data;
};

// function to convert temperature kelvin to celcius
const convertKelvinToCelcius = (temp) => {
  return (temp - 273.15).toFixed(0);
};

const renderCurrentWeatherData = (temperature, weather, icon) => {
  CurrentConditionElement.innerHTML = `
    <h2>Current Conditions</h2>
    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" />
    <div class="current">
    <div class="temp">${temperature}℃</div>
    <div class="condition">${weather}</div>
    </div>
  `;
};

// Get coordinates of user's current location
navigator.geolocation.getCurrentPosition(
  ({ coords: { latitude, longitude } }) => {
    getCurrentWeatherData(latitude, longitude)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    getFiveDayWeatherData(latitude, longitude);
  }
);
