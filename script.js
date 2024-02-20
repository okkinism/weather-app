const apiKey = "e53f52ec39725425ffb2b3014b142a6c";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

function updateWeatherData(data) {
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temperature").innerHTML =
    Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  switch (data.weather[0].main) {
    case "Clouds":
      weatherIcon.src = "images/clouds.png";
      break;
    case "Clear":
      weatherIcon.src = "images/clear.png";
      break;
    case "Rain":
      weatherIcon.src = "images/rain.png";
      break;
    case "Drizzle":
      weatherIcon.src = "images/drizzle.png";
      break;
    case "Mist":
      weatherIcon.src = "images/mist.png";
      break;
    default:
      weatherIcon.src = "images/clouds.png";
  }
}

async function getWeather(city) {
  const response = await fetch(apiUrl + city + "&appid=" + apiKey);
  const data = await response.json();

  if (data.cod === "404") {
    alert("Kota Tidak Ditemukan");
  } else {
    updateWeatherData(data);
  }
}

searchBox.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    getWeather(searchBox.value);
  }
});

searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
});
