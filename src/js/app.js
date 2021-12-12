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

// function to render current weather data
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

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// function to render five day weather data
const renderFiveDayWeatherData = (data) => {
  for (let i = 0; i < 40; i = i + 8) {
    let maxTemp = data
      .slice(i, i + 8)
      .map((item) => item.main.temp_max)
      .sort();

    let minTemp = data
      .slice(i, i + 8)
      .map((item) => item.main.temp_min)
      .sort();

    let day = weekday[new Date(data[i].dt_txt).getDay()];

    ForecastElement.insertAdjacentHTML(
      "beforeend",
      `
      <div class="day">
      <h3>${day}</h3>
      <img src="http://openweathermap.org/img/wn/${
        data[i + 2].weather[0].icon
      }@2x.png" />
      <div class="description">${data[i + 2].weather[0].description}</div>
      <div class="temp">
        <span class="high">${convertKelvinToCelcius(
          maxTemp[maxTemp.length - 1]
        )}℃</span>/<span class="low">${convertKelvinToCelcius(
        minTemp[0]
      )}℃</span>
      </div>
      </div>
    `
    );
  }
};

// Get coordinates of user's current location
navigator.geolocation.getCurrentPosition(
  ({ coords: { latitude, longitude } }) => {
    getCurrentWeatherData(latitude, longitude)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    getFiveDayWeatherData(latitude, longitude)
      .then((data) => console.log(data.list))
      .catch((error) => console.log(error));
  }
);
