//date & time - forecast
function formatDate(timestamp) {
let date = new Date(timestamp);

let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
  `Sunday`
];
let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
return `${hours}:${minutes}`;
}

//temperature & location

function search(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-text-input");
  console.log(searchInput.value);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  searchCity(searchInput.value);
}

function searchLocation(position) {
  let apiKey = "78251f458f96a759bc4e7e717b3145fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentLocationShowTemperature);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

//forecast

function dispalyForecast(response) {
  
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="card">
          <img src="images/${forecast.weather[0].icon}.png" class="card-img-top" id="icon" alt="...">
          <div class="card-body">
           <h5 class="card-title">${formatHours(forecast.dt * 1000)}</h5>
            <div class="weather-forecast-temperature">${Math.round(forecast.main.temp)}°</div>
          </div>
  `;
  }
}

function searchCity(city) {
  let apiKey = "78251f458f96a759bc4e7e717b3145fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentLocationShowTemperature);

   apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
}

let form = document.querySelector("#Search-form");
form.addEventListener("submit", search);

function currentLocationShowTemperature(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city-outcome");
  let temperatureElement = document.querySelector("#current-temperature");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");

  let iconElement = document.querySelector("#icon");
  cityElement.innerHTML = `${city}`;
  temperatureElement.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML =response.data.weather[0].main;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  iconElement.setAttribute(
  "src",
  `images/${response.data.weather[0].icon}.png`
   );
   iconElement.setAttribute("alt", response.data.weather[0].description);
}




// Celcius & Fahrenheit

let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");

function convertToCelsius(event) {
  event.preventDefault();
  let currenttemperature = document.querySelector("#current-temperature");
  let convertedtemperature = Math.round(
    ((currenttemperature.innerHTML - 32) * 5) / 9
  );
  currenttemperature.innerHTML = `${convertedtemperature}`;
}
function convertToFahrenheit() {
  let currenttemperature = document.querySelector(`#current-temperature`);
  let convertedtemperature = Math.round(
    (currenttemperature.innerHTML * 9) / 5 + 32
  );
  currenttemperature.innerHTML = `${convertedtemperature}`;
}
fahrenheit.addEventListener("click", convertToFahrenheit);
celsius.addEventListener("click", convertToCelsius);
