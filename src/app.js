function formatDate(timeStamp){
  let date = new Date(timeStamp);
  let hours = date.getHours();
  if (hours < 10 ) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;
}

function displayForecast(){
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat","Sun" ];
  
  let forecastHTML = `<div class = "row">`;
  days.forEach(function(day){
    forecastHTML =
      forecastHTML +
     ` <div class="col-2">
    <div class="weather-forecast-date">${day}</div>
       <div>
        <img class=forescast-icon src="images/sunny-cloudy.png" alt=""width="50px">
      </div>
      <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
  </div>
</div>` ;

  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
};

function displayTemperature(response) {
  
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000) ;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
}
  function search(query){
  let apiKey = "3423f9e30e80437oae320f8639950tb8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayTemperature);
  }

function handleSubmit(event){
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  search(searchInputElement.value);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active")
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5+ 32;
  let temperatureElement = document.querySelector ("#temperature");
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);


search ("Berlin");
displayForecast();