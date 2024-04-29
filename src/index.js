function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temp-value");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = `${Math.round(
    temperature
  )}<small>&deg;c</small>`;
  let cityElement = document.querySelector("#weather-app-city");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  let description = response.data.condition.description;
  descriptionElement.innerHTML = ` , ${description}`;
  let letterHumidityElement = document.querySelector("#letterHumidity");
  letterHumidityElement.innerHTML = `Humidity: `;
  let humidityElement = document.querySelector("#Humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let letterWindElemet = document.querySelector("#letterWind");
  letterWindElemet.innerHTML = ` , Wind: `;
  let windElement = document.querySelector("#Wind");
  let windSpeed = response.data.wind.speed;
  windElement.innerHTML = `${Math.round(windSpeed)}km/h`;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);
  let iconElement = document.querySelector("#emoji");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="emoji"/>`;
  console.log(response);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apikey = "6et42e40f4ba010c3b966ed6o8f35438";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enterCity");
  let cityElement = document.querySelector("#weather-app-city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = "";
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
     
            <div class="col-2">
              <div class="weather-forecast-date">${day}</div>
              <div class="icon">🌦️</div>
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">18&deg; </span
                ><span class="weather-forecast-temperature-min"> 12&deg;</span>
              </div>
            
          </div>
          `;
  });
  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
